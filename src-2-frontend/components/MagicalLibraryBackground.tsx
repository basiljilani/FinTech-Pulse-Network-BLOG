import React, { useEffect, useRef } from 'react';

const MagicalLibraryBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    // Particle configuration
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      fadeSpeed: number;
    }> = [];

    const createParticle = () => {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.8, // Increased speed
        speedY: (Math.random() - 0.5) * 0.8, // Increased speed
        opacity: Math.random() * 0.6 + 0.2,  // Increased base opacity
        fadeSpeed: Math.random() * 0.03 + 0.01 // Increased fade speed
      };
    };

    // Initialize particles
    for (let i = 0; i < 70; i++) { // Increased number of particles
      particles.push(createParticle());
    }

    // Animation
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        // Update
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.opacity += Math.sin(Date.now() * 0.002) * 0.02; // Faster opacity oscillation

        // Keep particles in bounds
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        // Keep opacity in bounds
        particle.opacity = Math.max(0.2, Math.min(0.7, particle.opacity)); // Increased opacity range

        // Draw
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${particle.opacity})`;
        ctx.fill();

        // Random connection lines between nearby particles
        particles.forEach((otherParticle, otherIndex) => {
          if (index === otherIndex) return;
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) { // Increased connection distance
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.15 * (1 - distance / 120)})`; // Increased line opacity
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0A0F1E]">
      <div className="absolute inset-0">
        <img
          src="/images/magical-library.jpg"
          alt="Magical Library"
          className="w-full h-full object-cover opacity-75" // Increased image opacity
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0f2c]/60 via-[#0A0F1E]/60 to-[#0A0F1E]"> {/* Reduced gradient opacity */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ mixBlendMode: 'screen' }}
          />
        </div>
      </div>
    </div>
  );
};

export default MagicalLibraryBackground;
