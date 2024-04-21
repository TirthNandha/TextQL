// ChatGPTMessage.jsx
import React from "react";

// const ChatGPTMessage = ({ message,question }) => {
//     console.log(message, question)
//   return (<>
//     <div className="flex flex-row items-start mb-4">
//       <img
//         src="/imagex.png" // Use your own chatbot icon
//         alt="Chatbot"
//         className="h-8 w-8 rounded-full mr-2"
//       />
//       <div className="bg-gray-200 py-2 px-4 rounded-lg max-w-xs">
//         <p className="text-sm text-gray-800">{message}</p>
//       </div>
//     </div>
//     <div className="flex flex-row items-start mb-4">
//       <img
//         src="/imagex.png" // Use your own chatbot icon
//         alt="Chatbot"
//         className="h-8 w-8 rounded-full mr-2"
//       />
//       <div className="bg-gray-200 py-2 px-4 rounded-lg max-w-xs">
//         <p className="text-sm text-gray-800">{question}</p>
//       </div>
//     </div></>
//   );
// };
const ChatGPTMessage = ({ message }) => {
  if (message.type === "question") {
    return <div className="text-right my-2"><span className="bg-blue-300 px-2 py-1 rounded">{message.data}</span></div>;
  } else if (message.type === "answer") {
    return <div className="text-left my-2"><span className="bg-gray-300 px-2 py-1 rounded">{message.data}</span></div>;
  } else {
    return null;
  }
};


export default ChatGPTMessage;
