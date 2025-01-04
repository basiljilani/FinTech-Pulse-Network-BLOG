import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[90vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/earth-bg.jpg"
          alt="Earth from Space"
          className="w-full h-full object-cover object-center brightness-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-[90vh] flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Main Content */}
            <div className="max-w-3xl">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg">
                Transform Your{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
                  Financial Future
                </span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-white mb-8 font-medium drop-shadow-lg">
                Experience the next generation of financial intelligence.
                Make smarter, data-driven decisions with powerful analytics.
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigate('/fintech-hub')}
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-lg font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_25px_-5px_rgba(59,130,246,0.4)] border border-white/10"
                  style={{
                    boxShadow: '0 4px 15px -3px rgba(0, 0, 0, 0.2), 0 2px 4px -2px rgba(0, 0, 0, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.15)'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-violet-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.15),rgba(255,255,255,0))]" />
                  <div className="absolute inset-0 bg-[length:200%_200%] bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[100%] animate-[shimmer_2s_infinite] group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
                  <span className="relative flex items-center gap-2 drop-shadow-sm">
                    Get Started
                    <span className="inline-block">
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </span>
                </button>
                
                <button
                  onClick={() => navigate('/about')}
                  className="group relative px-8 py-4 text-white rounded-lg font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] border border-white/10 hover:border-white/20"
                  style={{
                    boxShadow: '0 4px 15px -3px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.05), inset 0 1px 1px rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <div className="absolute inset-0 bg-black/20 backdrop-blur-sm group-hover:bg-black/30 transition-colors duration-300" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.1),rgba(255,255,255,0))]" />
                  <div className="absolute inset-0 bg-[length:200%_200%] bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-[100%] animate-[shimmer_2s_infinite] group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
                  <span className="relative drop-shadow-sm">Learn More</span>
                </button>
              </div>
            </div>

            {/* Right Column - Founder's Message */}
            <div className="relative backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-violet-500/30 transition-all duration-300">
              <div className="absolute -top-3 -right-3">
                <div className="bg-gradient-to-r from-blue-500 to-violet-500 p-2 rounded-full">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z"/>
                  </svg>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400 mb-2">
                  The Vision
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  At FinTech Pulse Network, we're more than a platform—we're your lifelong partner in financial empowerment. With Pulse AI and Pulse AI V2, we're breaking barriers, fixing habits, and driving growth for individuals and businesses alike.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  This is more than innovation; it's a revolution. Confidence, clarity, and control over your finances aren't just goals—they're your right. Together, we're shaping a future where no one is left behind.
                </p>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-white font-semibold">— Basil Jilani</p>
                  <p className="text-gray-400">Founder, FinTech Pulse Network</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
