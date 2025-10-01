import { Send, X } from "lucide-react";

export default function ChatInput({ input, setInput, onSend, isLoading, replyTo, onCancelReply }) {
  return (
    <div className="chat-input-main">
      {/* Reply Preview */}
      {replyTo && (
        <div className="reply-preview">
          <div className="reply-content">
            <div className="reply-header">
              <span className="reply-to">
                Replying to {replyTo.sender === "ai" ? "🤖 AI Assistant" : "👤 You"}
              </span>
              <button 
                className="cancel-reply" 
                onClick={onCancelReply}
                type="button"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="reply-message">
              {replyTo.text.length > 50 ? `${replyTo.text.substring(0, 50)}...` : replyTo.text}
            </div>
          </div>
        </div>
      )}
      
      <div className="chat-input-wrapper-inner">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isLoading ? "AI is responding..." : "Type a message..."}
          className="chat-input-field"
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && onSend()}
          disabled={isLoading}
        />
        <button
          onClick={onSend}
          disabled={!input.trim() || isLoading}
          className={`chat-send-button ${
            input.trim() && !isLoading ? "active" : "inactive"
          }`}
        >
          <Send className="send-icon" />
        </button>
      </div>
    </div>
  );
}