import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send, Loader2, Paperclip } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { openaiProvider } from '../lib/openai';
import { deepseekProvider } from '../lib/deepseek';
import { LLMProvider, LLMProviderType } from '../lib/llmTypes';
import { processFile, formatFileSize, validateFile } from '../lib/fileHandler';

interface Message {
  text: string;
  isUser: boolean;
  isFile?: boolean;
  fileName?: string;
  fileSize?: string;
}

interface TokenUsage {
  total: number;
}

interface ChatResponse {
  success: boolean;
  message: string;
  error?: { message: string };
  usage?: { total_tokens: number };
}

const Chatbot = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [sessionTokens, setSessionTokens] = useState<TokenUsage>({ total: 0 });
  const [showWelcome, setShowWelcome] = useState(true);
  const [selectedProvider, setSelectedProvider] = useState<LLMProviderType>('openai');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const providers: Record<LLMProviderType, LLMProvider> = {
    openai: openaiProvider,
    deepseek: deepseekProvider
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowWelcome(false);
    const file = event.target.files?.[0];
    if (!file) return;

    const validation = validateFile(file);
    if (!validation.valid) {
      const errorMessage: Message = {
        text: validation.error || 'Invalid file',
        isUser: false
      };
      setMessages(prev => [...prev, errorMessage]);
      return;
    }

    try {
      const fileInfo = await processFile(file);
      setCurrentFile(file);
      event.target.value = ''; // Reset file input
    } catch (error: any) {
      const errorMessage: Message = {
        text: error.message || 'Failed to process file',
        isUser: false
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() && !currentFile) return;

    const newMessage: Message = {
      text: inputValue,
      isUser: true,
      ...(currentFile && {
        isFile: true,
        fileName: currentFile.name,
        fileSize: formatFileSize(currentFile.size)
      })
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsLoading(true);
    setShowWelcome(false);

    try {
      let fileInfo = currentFile ? await processFile(currentFile) : undefined;

      const response = await providers[selectedProvider].sendChatMessage(
        inputValue,
        fileInfo ? { name: fileInfo.name, content: fileInfo.content } : undefined
      );

      if (response.success && response.message) {
        const botMessage: Message = {
          text: response.message,
          isUser: false
        };
        setMessages(prev => [...prev, botMessage]);
        
        if (response.usage) {
          setSessionTokens(prev => ({
            total: prev.total + response.usage!.total_tokens
          }));
        }
      } else {
        throw new Error(response.error?.message || 'Failed to get response');
      }
    } catch (error: any) {
      console.error('Error:', error);
      const errorMessage: Message = {
        text: `Error: ${error.message}`,
        isUser: false
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setCurrentFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Grid Background */}
      <div 
        className="fixed inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(179, 157, 219, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(179, 157, 219, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }}
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col relative z-10 h-screen overflow-hidden">
        {/* Content wrapper with fixed positioning */}
        <div className="flex-1 flex items-stretch sm:items-center justify-center">
          <div className="h-screen grid grid-rows-7 sm:block sm:h-auto sm:py-8">
            <div className="row-start-2 row-span-5 sm:block" style={{ 
              width: '1100px',
              maxWidth: 'calc(100vw - 24px)',
              height: '100%',
              margin: '0 auto'
            }}>
              <div className="h-full sm:h-[600px] bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-xl border border-gray-800 hover:border-indigo-500/30 transition-all duration-300 flex flex-col">
                {/* Chat Header */}
                <div className="p-2.5 sm:p-4 border-b border-gray-800 flex items-center justify-between bg-black/40">
                  <div className="flex items-center space-x-2.5 sm:space-x-3">
                    <MessageSquare className="h-[18px] w-[18px] sm:h-5 sm:w-5 text-indigo-400" />
                    <h2 className="text-[15px] sm:text-lg font-bold">
                      <span className="text-white">Pulse</span>
                      <span className="text-indigo-400">AI</span>
                    </h2>
                  </div>
                  <div className="flex items-center space-x-4">
                    <select
                      value={selectedProvider}
                      onChange={(e) => setSelectedProvider(e.target.value as LLMProviderType)}
                      className="px-3 py-1.5 border border-indigo-500 rounded-md text-sm bg-indigo-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 hover:bg-indigo-700 transition-colors cursor-pointer"
                    >
                      <option value="openai">{providers.openai.name} ({providers.openai.model})</option>
                      <option value="deepseek">{providers.deepseek.name} ({providers.deepseek.model})</option>
                    </select>
                    <div className="text-sm text-white">
                      Session Tokens: {sessionTokens.total}
                    </div>
                  </div>
                </div>
                
                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-2.5 sm:p-6 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent hover:scrollbar-thumb-gray-600">
                  <div className="flex flex-col space-y-2.5 sm:space-y-4">
                    {showWelcome ? (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex justify-start"
                      >
                        <div className="max-w-[85%] px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-[#1a1f2e] text-gray-200">
                          <div className="whitespace-pre-wrap break-words leading-relaxed text-[13px] sm:text-base">
                            Hello there! I'm so excited to connect with you on your financial journey. Whether you're just starting out or looking to level up your money management skills, you've already taken a powerful first step by reaching out. That shows real courage and commitment to your financial well-being! Tell me, what's on your mind today?
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      messages.map((message, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                          className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[85%] px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl ${
                              message.isUser
                                ? 'bg-indigo-500/80 text-white'
                                : 'bg-gray-800/50 text-gray-200'
                            }`}
                          >
                            {message.isFile ? (
                              <div className="flex items-center space-x-2">
                                <Paperclip className="w-4 h-4 opacity-75" />
                                <span className="truncate">{message.fileName}</span>
                                <span className="text-sm opacity-75 whitespace-nowrap">({message.fileSize})</span>
                              </div>
                            ) : (
                              <div 
                                className="whitespace-pre-wrap break-words leading-relaxed text-[13px] sm:text-base"
                                dangerouslySetInnerHTML={{ __html: message.text }}
                              />
                            )}
                          </div>
                        </motion.div>
                      ))
                    )}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-gray-800/50 text-gray-200 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl flex items-center space-x-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span className="text-sm">Thinking...</span>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                {/* Input Area */}
                <div className="p-2.5 sm:p-4 bg-black/40 border-t border-gray-800">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="p-2 sm:p-2 text-gray-400 hover:text-indigo-400 transition-colors"
                    >
                      <Paperclip className="h-[18px] w-[18px] sm:h-5 sm:w-5" />
                    </button>

                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={
                        isLoading 
                          ? "Please wait..." 
                          : currentFile 
                            ? `Ask about ${currentFile.name}...` 
                            : "Type your message..."
                      }
                      disabled={isLoading}
                      className="flex-1 bg-gray-800/50 text-white placeholder-gray-400 rounded-full px-3.5 py-2 sm:px-4 sm:py-2 focus:outline-none focus:ring-1 focus:ring-indigo-400 text-[13px] sm:text-base"
                    />

                    <button
                      onClick={handleSendMessage}
                      disabled={isLoading || (!inputValue.trim() && !currentFile)}
                      className="p-2 sm:p-2 text-indigo-400 hover:text-indigo-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <Loader2 className="h-[18px] w-[18px] sm:h-5 sm:w-5 animate-spin" />
                      ) : (
                        <Send className="h-[18px] w-[18px] sm:h-5 sm:w-5" />
                      )}
                    </button>
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".txt,.pdf,.doc,.docx"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;

// Add scroll to top behavior at page level
export const config = {
  unstable_runtimeJS: true,
  unstable_JsPreload: false,
  scrollToTop: true,
};
