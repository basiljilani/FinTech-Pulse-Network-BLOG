import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send, Loader2 } from 'lucide-react';
import { sendChatMessage } from '../utils/vextApi';
import { useNavigate } from 'react-router-dom';

interface Message {
  text: string;
  isUser: boolean;
  citation?: any;
}

const Chatbot = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState<{ isReady: boolean; error?: string }>({ isReady: true });
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading || isInputDisabled) return;

    // Add user message
    const userMessage: Message = { text: inputValue, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Temporary placeholder response
    setTimeout(() => {
      const placeholderResponse: Message = {
        text: "Hello there! 🌟 \n\nWe're currently working hard behind the scenes to bring you an amazing experience with Pulse AI. We can't wait to get started on this journey together and empower your financial future! \n\nThank you for your patience and support!",
        isUser: false
      };
      setMessages(prev => [...prev, placeholderResponse]);
      setIsLoading(false);
      setIsInputDisabled(true); // Disable input after response
    }, 1000);

    // Comment out the actual API call for now
    /*
    try {
      const result = await sendChatMessage(inputValue);
      
      if (result.success) {
        // Add bot message
        const botMessage: Message = {
          text: result.message,
          isUser: false,
          citation: result.citation
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        // Add error message
        const errorMessage: Message = {
          text: result.error?.message || 'Failed to get response',
          isUser: false
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error: any) {
      // Add error message
      const errorMessage: Message = {
        text: error.message || 'Failed to send message',
        isUser: false
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
    */
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
                    {message.text}
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
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={isInputDisabled ? "We can't wait to Empower and Guide you to the Financial Future YOU Deserve." : isLoading ? "Please wait..." : "Type your message..."}
                  disabled={isLoading || isInputDisabled}
                  className="flex-1 bg-[#1A1F2E] text-white border border-[#8B5CF6]/20 rounded-lg px-4 py-2 focus:outline-none focus:border-[#8B5CF6]/50 disabled:opacity-50"
                />
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !inputValue.trim() || isInputDisabled}
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
