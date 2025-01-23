import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center px-4 overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(25,25,25,0.8)_0%,transparent_65%)]" />
      <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-12">
        {/* Heading */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight animate-fade-in">
            Transform Your
            <span className="block mt-2 bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent font-light">
              Financial Future
            </span>
          </h1>
        </div>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed animate-fade-in-up">
          Experience the next generation of financial intelligence.
          <br className="hidden sm:block" />
          Make smarter, data-driven decisions with powerful analytics.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up delay-200">
          <Link
            to="/fintech-hub"
            className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] border border-slate-700/50"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center text-lg font-medium group-hover:translate-x-1 transition-transform">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
          
          <Link
            to="/about"
            className="group inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white border border-white/20 rounded-lg backdrop-blur-sm hover:bg-white/5 transition-all duration-300 hover:border-white/30 hover:scale-[1.02]"
          >
            <span className="group-hover:translate-x-1 transition-transform">
              Learn More
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
