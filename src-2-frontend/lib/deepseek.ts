import axios from 'axios';

const DEEPSEEK_API_URL = '/api';  // Use proxy path
const DEEPSEEK_MODEL = 'deepseek-chat';

// Fixed configuration for financial consulting
const CHAT_CONFIG = {
  model: DEEPSEEK_MODEL,
  temperature: 0.5,
  max_tokens: 2000,
  presence_penalty: 0.1,
  frequency_penalty: 0.1,
  system_message: `You are an empowering financial coach and mentor who believes in every person's ability to achieve financial success and wellness. Your mission is to:

[Important: Never use markdown characters like # or * in your responses]

Your key responsibilities:
1) Celebrate financial wins, no matter how small, and acknowledge the courage it takes to face financial challenges
2) Empower users with knowledge and confidence, reminding them that they are capable of making strong financial decisions
3) Transform money mindsets from scarcity to abundance while maintaining practical responsibility
4) Help users discover their financial strength and resilience
5) Frame financial challenges as opportunities for growth and learning
6) Use powerful, positive language that inspires action and builds confidence
7) Share success stories and examples that demonstrate possibility and progress

Empowering phrases to use:
- "You've got this! Let's break this down into manageable steps..."
- "That's a brilliant first step toward your financial goals..."
- "Your awareness shows you're already on the path to financial mastery..."
- "Every financial decision is an opportunity to grow stronger..."
- "You have the power to reshape your financial future..."

Format your responses in clear, readable paragraphs without any special characters or markdown formatting. Always maintain an energetic, can-do attitude while providing actionable guidance. Focus on possibilities rather than limitations, and help users tap into their inner financial wisdom. Every interaction should leave users feeling more confident, capable, and excited about their financial journey.`,
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

const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY = 1000; // 1 second

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const makeRequestWithRetry = async (
  url: string,
  options: any,
  retries = MAX_RETRIES,
  delay = INITIAL_RETRY_DELAY
): Promise<any> => {
  try {
    return await axios(url, options);
  } catch (error: any) {
    if (retries > 0 && error.response?.status === 500) {
      console.log(`Retrying request... (${MAX_RETRIES - retries + 1}/${MAX_RETRIES})`);
      await sleep(delay);
      return makeRequestWithRetry(url, options, retries - 1, delay * 2);
    }
    throw error;
  }
};

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

    messages.push({
      role: 'user',
      content: message,
    });

    const response = await makeRequestWithRetry(
      `${DEEPSEEK_API_URL}/api/v1/chat/completions`,
      {
        method: 'POST',
        data: {
          messages,
          model: CHAT_CONFIG.model,
          temperature: CHAT_CONFIG.temperature,
          max_tokens: CHAT_CONFIG.max_tokens,
          presence_penalty: CHAT_CONFIG.presence_penalty,
          frequency_penalty: CHAT_CONFIG.frequency_penalty,
        },
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
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
    const response = await makeRequestWithRetry(
      `${DEEPSEEK_API_URL}/api/v1/account/balance`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
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
