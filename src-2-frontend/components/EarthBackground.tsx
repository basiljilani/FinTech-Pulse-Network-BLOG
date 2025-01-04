import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const EarthBackground: React.FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const x = useTransform(scrollY, [0, 500], [0, -1000]); // Slide left on scroll
  const scale = useTransform(scrollY, [0, 500], [1, 1.2]); // Subtle zoom effect
  const opacity = useTransform(scrollY, [0, 300], [1, 0]); // Fade out

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <motion.div 
        className="absolute inset-0"
        style={{ x, y, scale, opacity }}
      >
        <img
          src="/DALL·E 2025-01-04 15.04.38 - A high-resolution image of Earth from space at nighttime, symbolizing community and innovation. The continents are illuminated with glowing blue and w.webp"
          alt="Earth at night from space - AI generated"
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-black/30" />
      </motion.div>
    </div>
  );
};

export default EarthBackground;
