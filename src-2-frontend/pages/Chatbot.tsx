import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send, Loader2, Paperclip } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { sendChatMessage } from '../lib/deepseek';
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  const sendMessage = async () => {
    if (!inputValue.trim() && !currentFile) return;
    
    setShowWelcome(false);
    const userMessage: Message = {
      text: inputValue,
      isUser: true
    };

    if (currentFile) {
      userMessage.isFile = true;
      userMessage.fileName = currentFile.name;
      userMessage.fileSize = formatFileSize(currentFile.size);
    }

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const result = await sendChatMessage(inputValue, currentFile ? {
        name: currentFile.name,
        content: await currentFile.text()
      } : undefined);
      
      if (result.success && result.message) {
        const botMessage: Message = {
          text: result.message,
          isUser: false
        };
        
        setMessages(prev => [...prev, botMessage]);
        
        // Clear the current file after it's been processed
        setCurrentFile(null);

        // Update token usage if available
        if (result.usage) {
          setSessionTokens(prev => ({
            total: prev.total + result.usage!.total_tokens
          }));
        }
      } else {
        const errorMessage: Message = {
          text: result.error?.message || 'No response received',
          isUser: false
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error: any) {
      const errorMessage: Message = {
        text: typeof error.message === 'string' ? error.message : 'An error occurred',
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
      <div className="flex-1 flex flex-col relative z-10 h-screen">
        {/* Content wrapper with specific grid positioning */}
        <div className="flex-1 flex items-center justify-center" style={{ margin: '100px auto 100px auto' }}>
          <div style={{ 
            width: '1100px', // 11 grid boxes * 100px
            maxWidth: 'calc(100vw - 48px)', // Responsive safety margin
            margin: '0 auto' // Center horizontally
          }}>
            <div className="h-[600px] bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-xl border border-gray-800 hover:border-indigo-500/30 transition-all duration-300 flex flex-col">
              {/* Chat Header */}
              <div className="p-3 sm:p-4 border-b border-gray-800 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="h-5 w-5 text-indigo-400" />
                  <h2 className="text-lg font-medium text-white">Chat with <span className="text-indigo-400">Pulse AI</span></h2>
                </div>
                <div className="text-xs sm:text-sm text-gray-400">
                  Session Usage: {sessionTokens.total.toLocaleString()} tokens
                </div>
              </div>
              
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600/50 scrollbar-track-transparent p-4 sm:p-6">
                <div className="flex flex-col space-y-4">
                  {showWelcome ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex justify-start"
                    >
                      <div className="max-w-[85%] px-4 py-3 rounded-xl bg-gray-800/50 text-gray-200">
                        <div className="whitespace-pre-wrap break-words leading-relaxed text-sm sm:text-base">
                          Hello there! I'm so excited to connect with you on your financial journey. Whether you're just starting out or looking to level up your money management skills, you've already taken a powerful first step by reaching out. That shows real courage and commitment to your financial well-being!

                          Tell me, what's on your mind today? Are you looking to create a budget, pay off debt, save for a big goal, or maybe just feel more confident about your financial decisions? Whatever it is, I'm here to cheer you on and help you discover your financial strength. Remember, every step forward - no matter how small - is a victory worth celebrating.

                          You've got this! Let's work together to create a plan that feels empowering and achievable. What's one financial goal or challenge you'd like to tackle first?
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
                          className={`max-w-[85%] px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl ${
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
                            <div className="whitespace-pre-wrap break-words leading-relaxed text-sm sm:text-base">
                              {message.text}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))
                  )}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-800/50 text-gray-200 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl flex items-center space-x-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm sm:text-base">Thinking...</span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Input Area */}
              <div className="p-3 sm:p-4 border-t border-gray-800">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".txt,.csv,.pdf,.json,.xlsx,.xls"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className={`p-2 sm:p-2.5 text-indigo-400 hover:bg-indigo-500/10 rounded-xl transition-colors ${
                      currentFile ? 'bg-indigo-500/10' : ''
                    }`}
                    title={currentFile ? 'Replace attached file' : 'Attach file'}
                  >
                    <Paperclip className="h-5 w-5" />
                  </button>
                  <div className="flex-1 relative">
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
                      className="w-full bg-gray-800/50 text-white rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 disabled:opacity-50 text-sm sm:text-base"
                    />
                    {currentFile && (
                      <div className="absolute -top-6 left-4 text-xs text-gray-400 truncate max-w-[200px]">
                        {currentFile.name}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={sendMessage}
                    disabled={isLoading || !inputValue.trim() && !currentFile}
                    className="p-2 sm:p-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
