# Backend API Integration Guide

## Current Setup

Your React chatbox app is now configured to call a backend API, but currently uses mock responses since no backend exists yet.

## API Structure Expected

### Chat Endpoint
- **URL:** `POST /api/chat`
- **Request Body:**
```json
{
  "message": "User's message text",
  "history": [
    {
      "role": "user",
      "content": "Previous user message",
      "timestamp": "2025-09-30T12:00:00.000Z"
    },
    {
      "role": "assistant", 
      "content": "Previous AI response",
      "timestamp": "2025-09-30T12:00:01.000Z"
    }
  ]
}
```

- **Response:**
```json
{
  "reply": "AI response text",
  "status": "success"
}
```

## Backend Implementation Examples

### Python/Flask Backend

```python
@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json()
    message = data.get('message')
    history = data.get('history', [])
    
    # Your AI integration here
    ai_response = your_ai_service.generate_response(message, history)
    
    return jsonify({'reply': ai_response})
```

## Environment Configuration

Update `.env` file:

```env
# When you have a backend running
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_ENV=production

# For development with mock responses
REACT_APP_API_URL=http://localhost:3001/api  
REACT_APP_ENV=development
```

## Testing Your Backend

1. Start your backend server
2. Update `REACT_APP_ENV=production` in `.env`
3. Restart your React app
4. Test the chat functionality

The app will automatically fall back to mock responses if the backend is unavailable.

## Current Mock Features

While developing your backend, the app includes intelligent mock responses for:

- ✅ Greetings and farewells
- ✅ Time/date queries  
- ✅ Simple math calculations
- ✅ Help requests
- ✅ Conversational responses
- ✅ Error handling

## Next Steps

1. Choose your backend technology (Node.js, Python, etc.)
2. Set up your AI service (OpenAI, Claude, Gemini, etc.)
3. Implement the `/api/chat` endpoint
4. Update your environment variables
5. Test the integration!