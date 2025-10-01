import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export default function MessageBubble({ msg, idx, onReply, onJumpToMessage }) {
  const isAI = msg.sender === "ai";
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef(null);

  const handleRightClick = (e) => {
    e.preventDefault();
    setMenuPosition({ x: e.clientX, y: e.clientY });
    setShowContextMenu(true);
  };

  const handleReply = () => {
    if (onReply) {
      onReply(msg);
    }
    setShowContextMenu(false);
  };

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setShowContextMenu(false);
    }
  };

  useEffect(() => {
    if (showContextMenu) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showContextMenu]);
  
  return (
    <>
      <motion.div
        key={idx}
        initial={{ opacity: 0, y: 20, x: isAI ? -30 : 30 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`message-row ${isAI ? "ai-message" : "user-message"}`}
        onContextMenu={handleRightClick}
        style={{ cursor: 'context-menu' }}
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
            {/* Reply Reference - Show if this message is replying to another */}
            {msg.replyTo && (
              <div 
                className={`reply-reference ${isAI ? "ai-reply" : "user-reply"} clickable`}
                onClick={() => onJumpToMessage && onJumpToMessage(msg.replyTo.id)}
                title="Click to jump to original message"
              >
                <div className="reply-reference-content">
                  <span className="reply-reference-sender">
                    {msg.replyTo.sender === "ai" ? "🤖 AI Assistant" : "👤 You"}
                  </span>
                  <span className="reply-reference-text">
                    {msg.replyTo.text.length > 30 ? `${msg.replyTo.text.substring(0, 30)}...` : msg.replyTo.text}
                  </span>
                </div>
              </div>
            )}
            
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

      {/* Context Menu */}
      {showContextMenu && (
        <div
          ref={menuRef}
          className="context-menu"
          style={{
            position: 'fixed',
            top: menuPosition.y,
            left: menuPosition.x,
            zIndex: 1000,
          }}
        >
          <button
            className="context-menu-item"
            onClick={handleReply}
          >
            💬 Reply to this message
          </button>
        </div>
      )}
    </>
  );
}