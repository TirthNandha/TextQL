// ChatGPTMessage.jsx
import React from "react";

const ChatGPTMessage = ({ message }) => {
    console.log(message)
  return (
    <div className="flex flex-row items-start mb-4">
      <img
        src="/imagex.png" // Use your own chatbot icon
        alt="Chatbot"
        className="h-8 w-8 rounded-full mr-2"
      />
      <div className="bg-gray-200 py-2 px-4 rounded-lg max-w-xs">
        <p className="text-sm text-gray-800">{message}</p>
      </div>
    </div>
  );
};

export default ChatGPTMessage;
