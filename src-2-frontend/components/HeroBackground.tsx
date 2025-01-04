import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const HeroBackground: React.FC = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 1.1]);
  const translateY = useTransform(scrollY, [0, 400], [0, 100]);
  const blur = useTransform(scrollY, [0, 400], [0, 8]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <motion.div 
        className="absolute inset-0"
        style={{ 
          opacity,
          scale,
          y: translateY,
        }}
      >
        <div className="relative w-full h-full">
          <motion.video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: `blur(${blur}px)` }}
          >
            <source src="/videos/nyc-night.mp4" type="video/mp4" />
          </motion.video>

          {/* Color overlay for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/80" />
          
          {/* Ambient color effects */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 via-blue-900/20 to-transparent mix-blend-soft-light" />
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/20 via-transparent to-transparent" />
          </div>

          {/* Vignette effect */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_25%,_black_130%)]" />
          
          {/* Text enhancement gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60" />
        </div>
      </motion.div>
    </div>
  );
};

export default HeroBackground;
