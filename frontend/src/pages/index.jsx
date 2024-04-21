import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import ChatGPTMessage from "./component/chat";

export default function Home() {
  return <ChatGPTUI />;
}

const ChatGPTUI = () => {
  const [conversation, setConversation] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const chatEndRef = useRef(null);
  const [message,setMessage]=useState([])
  const [ question, setQuestion] = useState("")

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  const scrollToBottom = () => {
    chatEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return; // Do nothing if input is empty
    setMessage((prev) => [...prev, inputValue]);
    setQuestion(inputValue.trim());
    setInputValue(""); // Clear input field
  
    try {
      const response = await axios.get(`http://localhost:8000/ask?question=${inputValue}`);
      const responseData = response.data;
      // Update conversation with user's question and backend response
      setConversation((prevConversation) => [
        ...prevConversation,
        { data: inputValue, type: "question" },
        { data: responseData.sql, type: "answer" } // Pass responseData.data instead of responseData
      ]);
      console.log(conversation);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error, if needed
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 p-4 overflow-y-auto">
        {conversation.map((message, index) => (
          <ChatGPTMessage key={index} message={message} question={inputValue} />
        ))}
        <div ref={chatEndRef}></div>
      </div>
      <div className="p-4 bg-gray-100">
        <div className="flex items-center border rounded-lg overflow-hidden">
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full py-2 px-4 bg-transparent outline-none"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleSendMessage();
            }}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
