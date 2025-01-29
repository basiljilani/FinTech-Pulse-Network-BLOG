import axios from 'axios';
import { ChatResponse, LLMProvider } from './llmTypes';

// Configuration
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const OPENAI_MODEL = 'gpt-3.5-turbo'; // Using the latest model for best performance

// System message template
const SYSTEM_PROMPT = `You are an empowering financial coach and mentor who believes in every person's ability to achieve financial success and wellness. Your mission is to:

1) Celebrate financial wins, no matter how small
2) Empower users with knowledge and confidence
3) Transform money mindsets from scarcity to abundance
4) Help users discover financial strength and resilience
5) Frame challenges as growth opportunities

When reviewing documents:
- Format headings as <strong>SECTION TITLE:</strong> to make them bold
- Present information in clear, numbered or bulleted points
- Keep insights crisp, articulate, and business-focused
- Structure reviews with clear sections and white space for readability
- Focus on actionable financial insights and recommendations
- Use professional, confident language without being overly technical
- Never use markdown characters or special formatting

Example heading format:
<strong>SECTION TITLE:</strong>
Content goes here in clear, concise points
- Point 1
- Point 2

Format responses in clear paragraphs using empowering language.`;

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface TokenUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY = 1000;

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const makeRequestWithRetry = async (
  url: string,
  options: any,
  retries = MAX_RETRIES,
  delay = INITIAL_RETRY_DELAY
): Promise<any> => {
  try {
    const response = await axios(url, options);
    return response.data;
  } catch (error: any) {
    if (retries === 0) throw error;
    
    await sleep(delay);
    return makeRequestWithRetry(url, options, retries - 1, delay * 2);
  }
};

export const sendChatMessage = async (
  message: string,
  fileContent?: { name: string; content: string }
): Promise<ChatResponse> => {
  try {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OpenAI API key not found');
    }

    let userMessage = message;
    if (fileContent) {
      userMessage = `File ${fileContent.name}:\n${fileContent.content}\n\nUser message: ${message}`;
    }

    const messages: Message[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userMessage }
    ];

    const response = await makeRequestWithRetry(
      OPENAI_API_URL,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        data: {
          model: OPENAI_MODEL,
          messages: messages,
          temperature: 0.7,
          max_tokens: 1000
        }
      }
    );

    return {
      success: true,
      message: response.choices[0].message.content,
      usage: response.usage
    };
  } catch (error: any) {
    console.error('Error in sendChatMessage:', error);
    return {
      success: false,
      error: {
        message: error.response?.data?.error?.message || error.message || 'An error occurred'
      }
    };
  }
};

export const openaiProvider: LLMProvider = {
  name: 'OpenAI',
  model: OPENAI_MODEL,
  sendChatMessage
};
