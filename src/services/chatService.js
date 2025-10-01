// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Chat API Service
export const chatService = {
  // Send message to AI and get response
  async sendMessage(message, conversationHistory = [], replyContext = null) {
    try {
      const requestBody = {
        message: message,
        history: conversationHistory.slice(-10), // Send last 10 messages for context
      };

      // Add reply context if available
      if (replyContext) {
        requestBody.replyTo = {
          sender: replyContext.sender,
          text: replyContext.text,
          timestamp: replyContext.timestamp
        };
      }

      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.reply || data.message || "Sorry, I couldn't process that.";
    } catch (error) {
      console.error('Chat API Error:', error);
      
      // Fallback to mock responses when backend is not available
      return this.getMockResponse(message, replyContext);
    }
  },

  // Mock responses for development (when backend is not ready)
  getMockResponse(userInput, replyContext = null) {
    const input = userInput.toLowerCase().trim();

    // Handle reply context in mock responses
    if (replyContext) {
      const repliedTo = replyContext.sender === 'ai' ? 'my previous message' : 'your message';
      return `I see you're replying to ${repliedTo} about "${replyContext.text.substring(0, 30)}${replyContext.text.length > 30 ? '...' : ''}". ${this.getContextualMockResponse(input)}`;
    }

    // Greetings
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return "Hello! Nice to meet you! How can I assist you today? 😊";
    }

    // Questions about the AI
    if (input.includes('who are you') || input.includes('what are you')) {
      return "I'm your friendly AI assistant! I'm here to chat and help with any questions you might have. 🤖";
    }

    // How are you
    if (input.includes('how are you')) {
      return "I'm doing great, thank you for asking! I'm always excited to chat. How are you doing? 😄";
    }

    // Time/Date questions
    if (input.includes('time') || input.includes('date')) {
      const now = new Date();
      return `The current time is ${now.toLocaleTimeString()} and today is ${now.toLocaleDateString()}. ⏰`;
    }

    // Help requests
    if (input.includes('help') || input.includes('assist')) {
      return "I'm here to help! You can ask me questions, have a conversation, or just chat about anything you'd like. What would you like to talk about? 💬";
    }

    // Weather (mock response)
    if (input.includes('weather')) {
      return "I don't have access to real weather data, but I hope it's nice where you are! ☀️ Is the weather good today?";
    }

    // Compliments
    if (input.includes('good job') || input.includes('great') || input.includes('awesome') || input.includes('thank you') || input.includes('thanks')) {
      return "Thank you so much! That really means a lot to me. I'm glad I could help! 🙏✨";
    }

    // Goodbye
    if (input.includes('bye') || input.includes('goodbye') || input.includes('see you')) {
      return "Goodbye! It was great chatting with you. Have a wonderful day! 👋";
    }

    // Math questions
    if (input.match(/\d+\s*[\+\-\*\/]\s*\d+/)) {
      try {
        // Simple math evaluation (be careful with eval in real apps)
        const result = Function('"use strict"; return (' + input.replace(/[^0-9+\-*/().\s]/g, '') + ')')();
        return `The answer is ${result}! 🧮`;
      } catch {
        return "I can help with simple math! Try something like '2 + 2' or '10 * 5'. 🔢";
      }
    }

    // Programming questions
    if (input.includes('code') || input.includes('programming') || input.includes('javascript') || input.includes('react')) {
      return "I'd love to help with programming! What specific coding question do you have? 💻";
    }

    // Default responses for general conversation
    const responses = [
      "That's interesting! Tell me more about that. 🤔",
      "I see! What made you think of that? 💭",
      "Fascinating! I'd love to hear your thoughts on this. 🧠",
      "That's a great point! What do you think about it? ⭐",
      "Hmm, that's worth pondering. How do you feel about that? 💫",
      "Interesting perspective! I appreciate you sharing that with me. 🌟",
      "That sounds intriguing! Can you elaborate on that? 🔍",
      "I find that quite thought-provoking! What's your take on it? 💡"
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  },

  // Get contextual response when replying
  getContextualMockResponse(input) {
    const responses = [
      "Thanks for following up on that! 👍",
      "I appreciate the additional context! 💭",
      "That's a great way to build on our conversation! 🌟",
      "Thanks for the clarification! 😊",
      "I see what you mean now! 💡",
      "That adds good perspective to what we were discussing! ⭐"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  },

  // Get conversation history in the format expected by your backend
  formatConversationHistory(messages) {
    return messages.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text,
      timestamp: msg.timestamp || new Date().toISOString()
    }));
  }
};

// Export individual functions for easier imports
export const { sendMessage, getMockResponse, formatConversationHistory } = chatService;