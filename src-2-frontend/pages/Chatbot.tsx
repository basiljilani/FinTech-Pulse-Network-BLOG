import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send, Loader2, Paperclip } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { sendChatMessage, getTokenBalance } from '../lib/deepseek';
import { processFile, formatFileSize, validateFile } from '../lib/fileHandler';

interface Message {
  text: string;
  isUser: boolean;
  citation?: any;
  isFile?: boolean;
  fileName?: string;
  fileSize?: string;
}

interface TokenInfo {
  available?: number;
  currentUsage: {
    prompt: number;
    completion: number;
    total: number;
  };
}

const Chatbot = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState<{ isReady: boolean; error?: string }>({ isReady: true });
  const [tokenInfo, setTokenInfo] = useState<TokenInfo>({
    currentUsage: { prompt: 0, completion: 0, total: 0 }
  });
  const [currentFile, setCurrentFile] = useState<{ name: string; content: string } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch token balance periodically
  useEffect(() => {
    const fetchBalance = async () => {
      const balance = await getTokenBalance();
      if (balance.success) {
        setTokenInfo(prev => ({
          ...prev,
          available: balance.available_tokens
        }));
      }
    };

    fetchBalance(); // Initial fetch
    const interval = setInterval(fetchBalance, 60000); // Refresh every minute

    return () => clearInterval(interval);
  }, []);

  // Scroll to top on mount and route change
  useEffect(() => {
    // Remove scroll behavior
    return () => {
      // No cleanup needed for react-router-dom
    };
  }, []);

  // Simplify API status check
  useEffect(() => {
    setApiStatus({ isReady: true });
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
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
      setCurrentFile({ name: fileInfo.name, content: fileInfo.content });
      event.target.value = ''; // Reset file input
    } catch (error: any) {
      const errorMessage: Message = {
        text: error.message || 'Failed to process file',
        isUser: false
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    // Prepare messages to be sent
    const messages: Message[] = [];
    
    // If there's a file waiting to be sent, add it first
    if (currentFile) {
      messages.push({
        text: `Attached file: ${currentFile.name}`,
        isUser: true,
        isFile: true,
        fileName: currentFile.name,
        fileSize: formatFileSize(new Blob([currentFile.content]).size)
      });
    }

    // Add the user's message
    messages.push({
      text: inputValue,
      isUser: true
    });

    // Update chat with all messages
    setMessages(prev => [...prev, ...messages]);
    setInputValue('');
    setIsLoading(true);

    try {
      const result = await sendChatMessage(
        inputValue,
        currentFile
      );
      
      if (result.success) {
        const botMessage: Message = {
          text: result.message || '',
          isUser: false,
        };
        setMessages(prev => [...prev, botMessage]);
        
        // Clear the current file after it's been processed
        setCurrentFile(null);
        
        if (result.usage) {
          setTokenInfo(prev => ({
            ...prev,
            currentUsage: {
              prompt: prev.currentUsage.prompt + result.usage!.prompt_tokens,
              completion: prev.currentUsage.completion + result.usage!.completion_tokens,
              total: prev.currentUsage.total + result.usage!.total_tokens
            }
          }));
        }
      } else {
        const errorMessage: Message = {
          text: result.error?.message || 'Failed to get response',
          isUser: false
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error: any) {
      const errorMessage: Message = {
        text: error.message || 'Failed to send message',
        isUser: false
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-[#0D1321] flex flex-col relative">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A1F2E] via-[#2D1B4D] to-[#0D1321] opacity-70 h-full" 
        style={{
          backgroundSize: '100px 100px',
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)'
        }}
      />
      
      <div className="flex-1 flex flex-col relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-6 pt-32 pb-12 flex flex-col h-[calc(100vh-64px)]"
        >
          <div className="flex-1 max-w-4xl mx-auto w-full bg-[#1A1F2E]/80 backdrop-blur-sm rounded-xl shadow-xl border border-[#8B5CF6]/20 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-[#8B5CF6]/20 flex items-center justify-between px-6">
              <div className="flex items-center">
                <MessageSquare className="h-6 w-6 text-[#8B5CF6] mr-3" />
                <h2 className="text-xl font-semibold text-white">Chat with <span className="text-[#8B5CF6]">Pulse AI</span></h2>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-200">
                <div className="flex flex-col items-end">
                  <span>Available Tokens: {tokenInfo.available?.toLocaleString() || 'Loading...'}</span>
                  <span>Session Usage: {tokenInfo.currentUsage.total.toLocaleString()} tokens</span>
                </div>
                <div className="h-8 w-px bg-gray-300" />
                <div className="flex flex-col items-end text-xs">
                  <span>Prompt: {tokenInfo.currentUsage.prompt.toLocaleString()}</span>
                  <span>Completion: {tokenInfo.currentUsage.completion.toLocaleString()}</span>
                </div>
              </div>
              {!apiStatus.isReady && apiStatus.error && (
                <div className="text-red-400 text-sm flex items-center">
                  <span className="mr-2">⚠️</span>
                  {apiStatus.error}
                </div>
              )}
            </div>
            
            {/* Chat Messages */}
            <div className="flex-1 p-6 overflow-y-auto min-h-0">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} mb-4`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-xl whitespace-pre-wrap ${
                      message.isUser
                        ? 'bg-[#6D28D9] text-white'
                        : 'bg-[#2D1B4D] text-gray-200'
                    }`}
                  >
                    {message.isFile ? (
                      <div>
                        <span>File: {message.fileName}</span>
                        <span> ({message.fileSize})</span>
                      </div>
                    ) : (
                      message.text
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start mb-4">
                  <div className="bg-[#2D1B4D] text-gray-200 px-4 py-2 rounded-xl flex items-center">
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    <span>Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-[#8B5CF6]/20">
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                  accept=".txt,.csv,.pdf,.json,.xlsx,.xls"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className={`text-[#8B5CF6] hover:text-[#7C3AED] p-2 rounded-lg transition-colors duration-200 flex items-center ${
                    currentFile ? 'bg-[#2D1B4D]' : ''
                  }`}
                  title={currentFile ? 'Replace attached file' : 'Attach file'}
                >
                  <Paperclip className="h-5 w-5" />
                  {currentFile && (
                    <span className="ml-2 text-xs text-gray-400 max-w-[150px] truncate">
                      {currentFile.name}
                    </span>
                  )}
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
                        ? `Ask a question about ${currentFile.name}...` 
                        : "Type your message..."
                  }
                  disabled={isLoading}
                  className="flex-1 bg-[#1A1F2E] text-white border border-[#8B5CF6]/20 rounded-lg px-4 py-2 focus:outline-none focus:border-[#8B5CF6]/50 disabled:opacity-50"
                />
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !inputValue.trim()}
                  className="bg-[#6D28D9] hover:bg-[#7C3AED] text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
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
