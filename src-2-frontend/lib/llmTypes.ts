export interface TokenUsage {
  prompt_tokens?: number;
  completion_tokens?: number;
  total_tokens: number;
}

export interface ChatResponse {
  success: boolean;
  message?: string;
  error?: {
    message: string;
  };
  usage?: TokenUsage;
}

export interface LLMProvider {
  name: string;
  model: string;
  sendChatMessage: (
    message: string,
    fileContent?: { name: string; content: string }
  ) => Promise<ChatResponse>;
}

export type LLMProviderType = 'openai' | 'deepseek';
