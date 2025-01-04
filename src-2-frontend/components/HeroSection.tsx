import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1.1, 1.2]);
  const translateY = useTransform(scrollY, [0, 400], [-50, 0]);
  const translateX = useTransform(scrollY, [0, 400], [50, 0]);
  const blur = useTransform(scrollY, [0, 400], [0, 4]);

  return (
    <div className="relative min-h-screen bg-black">
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0"
        style={{ 
          opacity: 0.9, // Increased base opacity
        }}
      >
        <motion.div 
          className="absolute inset-0 scale-110"
          style={{
            scale,
            y: translateY,
            x: translateX,
          }}
        >
          <div className="absolute inset-0">
            <motion.img
              src="/daniel-k-cheung-cPF2nlWcMY4-unsplash.jpg"
              alt="Modern Cityscape"
              className="w-full h-full object-cover object-[90%_center]"
              style={{ 
                filter: `blur(${blur}px)`,
                imageRendering: 'crisp-edges',
                WebkitBackfaceVisibility: 'hidden',
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)',
              }}
            />
          </div>
        </motion.div>

        {/* Minimal overlay for text readability */}
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Subtle ambient lighting */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent mix-blend-soft-light" />
        </div>

        {/* Light vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_60%,_black_140%)]" />
        
        {/* Subtle grain texture */}
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay">
          <div className="w-full h-full" 
               style={{ 
                 backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 2000 2000\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                 backgroundRepeat: 'repeat',
               }}
          />
        </div>
      </motion.div>

      {/* Content */}
      <motion.div className="h-screen flex flex-col sticky top-0">
        <div className="relative z-10 flex-1 flex items-center p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="max-w-2xl"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6"
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15] mb-8">
                  <span className="block text-white">Transform Your</span>
                  <span className="block mt-1 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                    Financial Future
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-300 max-w-xl leading-relaxed font-light">
                  Experience the next generation of financial intelligence. 
                  Make smarter, data-driven decisions with powerful analytics.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row items-start gap-6 mt-8"
              >
                <button
                  onClick={() => navigate('/fintech-hub')}
                  className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg text-lg font-medium hover:from-indigo-500 hover:to-purple-500 transition-all transform hover:scale-105 duration-300 flex items-center gap-2"
                >
                  Get Started
                  <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => navigate('/about')}
                  className="px-8 py-4 bg-white/5 backdrop-blur-sm text-white border border-white/10 rounded-lg text-lg font-medium hover:bg-white/10 hover:border-white/20 transition-all transform hover:scale-105 duration-300"
                >
                  Learn More
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-wrap items-start gap-8 mt-12 text-gray-400"
              >
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-indigo-400" />
                  <span>Real-time Insights</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-indigo-400" />
                  <span>Advanced Analytics</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-indigo-400" />
                  <span>Secure Platform</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
