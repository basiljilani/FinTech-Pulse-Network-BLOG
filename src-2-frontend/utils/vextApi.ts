const VEXT_API_KEY = import.meta.env.VITE_VEXT_API_KEY;
const ENDPOINT_ID = import.meta.env.VITE_VEXT_ENDPOINT_ID || '8NZKOT0BIO';
const BASE_URL = `https://payload.vextapp.com/hook/${ENDPOINT_ID}/catch`;

if (!VEXT_API_KEY) {
  throw new Error(
    'Vext API key is not set in environment variables. ' +
    'Please ensure your .env file contains: VITE_VEXT_API_KEY=your_api_key_here ' +
    'and restart the development server.'
  );
}

const generateChannelToken = () => {
  // Generate a unique channel token (you can modify this as needed)
  return `user_${Date.now()}`;
};

const checkLongPollingStatus = async (requestId: string, channelToken: string) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'X-API-Key': VEXT_API_KEY
    };

    const response = await fetch(`${BASE_URL}/${channelToken}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ request_id: requestId })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Status check failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Status check error:', error);
    throw error;
  }
};

export const sendChatMessage = async (message: string, useLongPolling = true) => {
  try {
    if (!VEXT_API_KEY) {
      throw new Error('API key is not configured. Please check your environment variables.');
    }

    const channelToken = generateChannelToken();
    const headers = {
      'Content-Type': 'application/json',
      'X-API-Key': VEXT_API_KEY
    };

    const payload = {
      message: message,
      stream: useLongPolling
    };

    console.log('Chat Request:', {
      url: `${BASE_URL}/${channelToken}`,
      headers: { ...headers, 'X-API-Key': '[HIDDEN]' },
      payload
    });

    const response = await fetch(`${BASE_URL}/${channelToken}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`Chat request failed with status ${response.status}: ${errorText}`);
    }

    const initialData = await response.json();
    console.log('Initial API Response:', initialData);

    // Handle long polling response
    if (useLongPolling && initialData.text?.request_id) {
      const requestId = initialData.text.request_id;
      
      // Poll for results
      while (true) {
        const pollResult = await checkLongPollingStatus(requestId, channelToken);
        console.log('Poll Result:', pollResult);
        
        // If we get a proper response, return it
        if (pollResult.text && typeof pollResult.text === 'string') {
          return {
            success: true,
            message: pollResult.text,
            citation: pollResult.citation
          };
        }
        
        // If still processing, wait before next poll
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    // Handle immediate response
    return {
      success: true,
      message: initialData.text || 'No response from AI',
      citation: initialData.citation
    };
  } catch (error: any) {
    console.error('Chat Error:', error);
    return {
      success: false,
      error: {
        message: error.message || 'Failed to send message',
        status: error.status || 'Request failed'
      }
    };
  }
};
