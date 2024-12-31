# AI Integration Documentation

## Overview
This document outlines the integration of the AI chatbot functionality in the FinTech Pulse Network application. The integration uses the Vext API for handling chat interactions and implements a real-time chat interface.

## Technical Stack
- Frontend: React with TypeScript
- API Integration: Vext API
- UI Components: Framer Motion for animations, Lucide React for icons
- State Management: React useState hooks

## Configuration

### Environment Variables
The following environment variables are required:
```env
VITE_VEXT_API_KEY=your_api_key_here
VITE_VEXT_ENDPOINT_ID=your_endpoint_id_here  # Default: 8NZKOT0BIO
```

### API Endpoints
Base URL: `https://payload.vextapp.com/hook/${ENDPOINT_ID}/catch`

## Implementation Details

### Core Components

1. **Chatbot Component** (`src-2-frontend/pages/Chatbot.tsx`)
   - Handles chat UI and user interactions
   - Manages message history and loading states
   - Implements auto-scrolling for new messages
   - Handles error states and API status

2. **API Integration** (`src-2-frontend/utils/vextApi.ts`)
   - Manages API communication
   - Implements long-polling for real-time responses
   - Handles authentication and error handling

### Message Flow
1. User sends message
2. Frontend adds message to chat history
3. Message is sent to Vext API
4. Response is received through long-polling
5. Bot response is added to chat history

### Data Structures

```typescript
interface Message {
  text: string;
  isUser: boolean;
  citation?: any;
}
```

### API Communication

#### Sending Messages
```typescript
const result = await sendChatMessage(message);
// Returns
{
  success: boolean;
  message?: string;
  citation?: any;
  error?: {
    message: string;
  }
}
```

## Current Status and Known Issues

### Working Features
- Chat interface implementation
- Message sending and receiving
- Real-time response handling
- Error handling and display
- Auto-scrolling to latest messages

### Temporary Implementation
During the API integration phase, we have implemented a placeholder response for better testing and user experience. When a user sends a message, they will receive the following response:

```
Hello there! 🌟
 
We're currently working hard behind the scenes to bring you an amazing experience with Pulse AI. We can't wait to get started on this journey together and empower your financial future!
 
Thank you for your patience and support!
```

This placeholder response:
- Maintains a consistent user experience during development
- Provides clear communication about the work in progress
- Allows for UI testing without API dependencies
- Disables further input after the first message to prevent spam and maintain a clean testing environment

### Pending Issues
1. **HTTPS Connection**
   - Currently failing to fetch responses due to HTTPS restrictions
   - Need to implement proper HTTPS configuration for the API endpoint
   - Temporary workaround: Placeholder response implemented

### Required Fixes
1. Enable HTTPS for the API endpoint
2. Update API endpoint configuration in environment variables
3. Implement proper SSL certificate handling

## Future Improvements
1. Implement message persistence
2. Add typing indicators
3. Enhance error handling with retry mechanisms
4. Add message delivery status indicators
5. Implement rate limiting and throttling

## Testing
Currently, the integration can be tested locally by:
1. Setting up proper environment variables
2. Running the development server
3. Navigating to `/chatbot` route

## Security Considerations
1. API keys are stored in environment variables
2. Channel tokens are generated per session
3. All API communications use HTTPS (pending configuration)
4. No sensitive data is stored in local storage

## Deployment Notes
- Ensure all environment variables are properly set in production
- Configure HTTPS certificates
- Set up proper CORS policies
- Implement rate limiting on production endpoints

## Troubleshooting Guide
1. **Blank Responses**
   - Check API key configuration
   - Verify HTTPS settings
   - Check network console for errors

2. **Connection Errors**
   - Verify API endpoint availability
   - Check CORS configuration
   - Verify network connectivity

3. **Message Failures**
   - Check request payload format
   - Verify API key permissions
   - Check rate limiting status

## Support and Resources
- [Vext API Documentation](https://docs.vextapp.com)
- [SSL/HTTPS Configuration Guide](https://docs.vextapp.com/ssl-setup)
- [API Error Codes Reference](https://docs.vextapp.com/errors)
