import { motion } from "framer-motion";

export default function MessageBubble({ msg, idx }) {
  const isAI = msg.sender === "ai";
  
  return (
    <motion.div
      key={idx}
      initial={{ opacity: 0, y: 20, x: isAI ? -30 : 30 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`message-row ${isAI ? "ai-message" : "user-message"}`}
    >
      <div className={`message-content ${isAI ? "ai" : "user"}`}>
        
        {/* Avatar */}
        <div className={`message-avatar ${
          isAI 
            ? "bg-gradient-to-br from-gray-600 to-gray-700 text-white" 
            : "bg-gradient-to-br from-blue-500 to-blue-600 text-white"
        }`}>
          {isAI ? "🤖" : "👤"}
        </div>
        
        {/* Message wrapper */}
        <div className={`message-wrapper ${isAI ? "ai" : "user"}`}>
          {/* WhatsApp-style chat bubble with border */}
          <div className={`message-bubble ${isAI ? "ai-bubble" : "user-bubble"}`}>
            {msg.text}
          </div>
          
          {/* Timestamp */}
          <div className={`message-time ${isAI ? "text-left" : "text-right"}`}>
            {new Date().toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: true 
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}