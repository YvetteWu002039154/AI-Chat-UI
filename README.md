# AI Chatbox - Enhanced Chat UI with Reply Features

A modern, full-screen React chat interface for AI conversations with enhanced reply functionality. Built to solve the frustrating experience of losing context when scrolling through long conversations in traditional AI chat interfaces.

## 🤔 **The Problem**

When using AI chat platforms like ChatGPT, I found myself constantly scrolling up to find the original message I was replying to. This became especially tedious in long conversations where context was scattered across many messages. The lack of proper reply threading made it difficult to maintain conversation flow and context.

## 💡 **The Solution**

This AI chatbox provides a **WhatsApp-style reply system** that allows you to:
- **Right-click any message** to reply directly to it
- **See reply context** in the input field before sending
- **Visual reply references** above messages showing what was replied to
- **Click reply references** to instantly jump back to the original message
- **Maintain conversation context** without endless scrolling

## ✨ **Key Features**

### 🎯 **Smart Reply System**
- **Right-click context menu** on any message bubble
- **Reply preview** above the chat input showing original message context
- **Visual reply references** displayed above messages that are replies
- **One-click navigation** to jump back to original messages

### 🎨 **Modern Chat Interface**
- **Full-screen web layout** (not mobile-first)
- **WhatsApp-style message bubbles** with borders and proper positioning
- **Smooth animations** with Framer Motion
- **Dark theme** with professional styling
- **Auto-scroll** to latest messages

### 🤖 **AI Integration Ready**
- **Context-aware responses** that understand reply relationships
- **Mock AI responses** for development
- **API service structure** ready for backend integration
- **Conversation history** management

### 🚀 **User Experience**
- **No horizontal scrollbars** - perfect viewport fit
- **Smooth scrolling** and navigation
- **Loading states** with typing indicators
- **Responsive design** across screen sizes

## 🛠️ **Tech Stack**

- **React 19.1.1** - Modern React with hooks
- **Vite 7.1.7** - Fast build tool and dev server
- **Framer Motion 12.23.22** - Smooth animations
- **Lucide React 0.544.0** - Beautiful icons
- **CSS3** - Custom styling with modern features

## 🚀 **Getting Started**

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd chatbox-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

## 💬 **How to Use Reply Features**

1. **Reply to a Message**
   - Right-click any message bubble
   - Select "💬 Reply to this message"
   - See the reply preview above the input field
   - Type your response and send

2. **Navigate to Original Messages**
   - Look for reply references (gray boxes above messages)
   - Click on any reply reference
   - Automatically scroll to the original message with highlight effect

3. **Cancel Replies**
   - Click the "X" button in the reply preview to cancel

## 🔧 **Configuration**

### Environment Variables
Create a `.env` file for API configuration:
```bash
VITE_API_URL=http://localhost:3001/api
```

### API Integration
The chat service is ready for backend integration. Update `src/services/chatService.js` to connect to your AI API endpoint.

## 📁 **Project Structure**

```
src/
├── components/
│   ├── MessageBubble.jsx    # Individual message component with reply features
│   └── ChatInput.jsx        # Input field with reply preview
├── services/
│   └── chatService.js       # API service with mock responses
├── App.jsx                  # Main chat application
├── App.css                  # Complete styling system
└── main.jsx                 # React entry point
```

## 🎯 **Motivation & Vision**

This project was born from the frustration of using traditional AI chat interfaces where:
- **Context gets lost** in long conversations
- **Scrolling is tedious** to find referenced messages  
- **No visual connection** between related messages
- **Poor conversation threading**

The goal is to create a **more intuitive AI chat experience** that maintains context and makes conversations flow naturally, just like modern messaging apps.

## 🤝 **Contributing**

Contributions are welcome! This project aims to improve AI chat UX for everyone who's tired of losing context in conversations.

## 📝 **License**

MIT License 

Copyright (c) 2025 Yvette


