import axios from 'axios';

const DEEPSEEK_API_URL = import.meta.env.VITE_DEEPSEEK_API_URL || 'https://api.deepseek.com';
const DEEPSEEK_MODEL = 'deepseek-chat-67b-v1.5';

// Fixed configuration for financial consulting
const CHAT_CONFIG = {
  model: DEEPSEEK_MODEL,
  temperature: 0.3, // Lower temperature for more consistent, professional responses
  max_tokens: 2000, // Allow longer responses for detailed financial advice
  presence_penalty: 0.1, // Slight penalty to avoid repetition
  frequency_penalty: 0.1, // Slight penalty to encourage diverse vocabulary
  // Add a system message to guide the model's behavior
  system_message: "You are a professional financial consultant with expertise in investment strategies, market analysis, and personal finance. Provide clear, accurate, and conservative financial advice based on established principles and market best practices. Always consider risk management and compliance in your recommendations."
};

interface TokenUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

interface ChatResponse {
  success: boolean;
  message?: string;
  error?: {
    message: string;
  };
  usage?: TokenUsage;
}

interface BalanceResponse {
  success: boolean;
  available_tokens?: number;
  error?: {
    message: string;
  };
}

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export const sendChatMessage = async (
  message: string,
  fileContent?: { name: string; content: string }
): Promise<ChatResponse> => {
  try {
    let messages: Message[] = [
      {
        role: 'system',
        content: CHAT_CONFIG.system_message,
      }
    ];

    // If file content is provided, add it to the context
    if (fileContent) {
      messages.push({
        role: 'user',
        content: `File: ${fileContent.name}\n\nContent:\n${fileContent.content}\n\nPlease analyze this file and provide insights.`,
      });
      messages.push({
        role: 'assistant',
        content: "I'll analyze this file and provide financial insights. What would you like to know about it?",
      });
    }

    // Add the user's message
    messages.push({
      role: 'user',
      content: message,
    });

    const response = await axios.post(
      `${DEEPSEEK_API_URL}/v1/chat/completions`,
      {
        messages,
        model: CHAT_CONFIG.model,
        temperature: CHAT_CONFIG.temperature,
        max_tokens: CHAT_CONFIG.max_tokens,
        presence_penalty: CHAT_CONFIG.presence_penalty,
        frequency_penalty: CHAT_CONFIG.frequency_penalty,
      },
      {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return {
      success: true,
      message: response.data.choices[0].message.content,
      usage: response.data.usage,
    };
  } catch (error: any) {
    console.error('DeepSeek API Error:', error);
    return {
      success: false,
      error: {
        message: error.response?.data?.error?.message || error.message || 'Failed to get response from AI',
      },
    };
  }
};

export const getTokenBalance = async (): Promise<BalanceResponse> => {
  try {
    const response = await axios.get(
      `${DEEPSEEK_API_URL}/v1/account/balance`,
      {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return {
      success: true,
      available_tokens: response.data.available_tokens,
    };
  } catch (error: any) {
    console.error('DeepSeek Balance Error:', error);
    return {
      success: false,
      error: {
        message: error.response?.data?.error?.message || error.message || 'Failed to get token balance',
      },
    };
  }
};
