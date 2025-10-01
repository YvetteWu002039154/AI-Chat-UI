import { Send } from "lucide-react";

export default function ChatInput({ input, setInput, onSend, isLoading }) {
  return (
    <div className="chat-input-main">
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