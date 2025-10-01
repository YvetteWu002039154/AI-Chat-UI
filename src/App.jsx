import { useState } from "react";
import MessageBubble from "./components/MessageBubble";
import ChatInput from "./components/ChatInput";
import { chatService } from "./services/chatService";
import "./App.css";

export default function ChatApp() {
  const [messages, setMessages] = useState([
    { id: 1, sender: "ai", text: "Hello! I'm your AI assistant. How can I help you today?", timestamp: new Date().toISOString() },
  ]);
  const [input, setInput] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleReply = (message) => {
    setReplyTo(message);
  };

  const handleCancelReply = () => {
    setReplyTo(null);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: input,
      timestamp: new Date().toISOString(),
      replyTo: replyTo ? {
        id: replyTo.id,
        text: replyTo.text,
        sender: replyTo.sender
      } : null
    };

    // Add user message immediately
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setReplyTo(null);
    setIsLoading(true);

    try {
      // Get conversation history for API context
      const conversationHistory = chatService.formatConversationHistory(messages);
      
      // Call API service with reply context (will use mock responses if backend is not available)
      const aiResponse = await chatService.sendMessage(userMessage.text, conversationHistory, replyTo);
      
      // Add AI response
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "ai",
          text: aiResponse,
          timestamp: new Date().toISOString(),
        },
      ]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      
      // Fallback error message
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "ai",
          text: "Sorry, I'm having trouble responding right now. Please try again! 😅",
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Add error boundary for debugging
  if (!messages) {
    return <div>Loading messages...</div>;
  }

  return (
    <div className="chat-container">
      <header className="chat-header">
        💬 AI Chatbox
      </header>

      <div className="messages-container">
        {messages.map((msg, idx) => (
          <MessageBubble key={msg.id || idx} msg={msg} idx={idx} onReply={handleReply} />
        ))}
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="message-row ai-message">
            <div className="message-content ai">
              <div className="message-avatar bg-gradient-to-br from-gray-600 to-gray-700 text-white">
                🤖
              </div>
              <div className="message-wrapper ai">
                <div className="ai-bubble flex items-center gap-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-sm text-gray-300">Thinking...</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="chat-input-container">
        <div className="chat-input-wrapper">
          <ChatInput
            input={input}
            setInput={setInput}
            onSend={handleSend}
            isLoading={isLoading}
            replyTo={replyTo}
            onCancelReply={handleCancelReply}
          />
        </div>
      </div>
    </div>
  );
}
