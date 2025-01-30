import React from 'react';
import { Bot, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 pt-32 pb-40 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 mix-blend-multiply" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight mb-8">
            Automate Your Financial Content
            <span className="block text-blue-200 mt-4">with AI-Powered Intelligence</span>
          </h1>
          <p className="mt-6 text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto mb-12">
            Transform your financial content creation with our advanced AI automation platform.
            Save time, ensure accuracy, and scale your content production.
          </p>
          <div className="flex justify-center space-x-6">
            <button 
              onClick={() => navigate('/auth')}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-medium hover:bg-blue-50 transition-colors inline-flex items-center text-lg"
            >
              <Bot className="h-6 w-6 mr-2" />
              Get Started
            </button>
            <button 
              onClick={() => navigate('/solutions')}
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-medium hover:bg-white/10 transition-colors inline-flex items-center text-lg"
            >
              <Sparkles className="h-6 w-6 mr-2" />
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}