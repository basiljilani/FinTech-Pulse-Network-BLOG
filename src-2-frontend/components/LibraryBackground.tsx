import React, { useState } from 'react';

const LibraryBackground: React.FC = () => {
  const [videoError, setVideoError] = useState(false);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0A0F1E]">
      <div className="absolute inset-0">
        {!videoError && (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-60"
            onError={() => setVideoError(true)}
          >
            <source src="/videos/magical-library.mp4" type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0f2c]/80 via-[#0A0F1E]/70 to-[#0A0F1E]" 
             style={{
               backgroundImage: `
                 radial-gradient(circle at 20% 50%, rgba(62, 20, 123, 0.15) 0%, transparent 50%),
                 radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)
               `
             }}
        />
      </div>
    </div>
  );
};

export default LibraryBackground;
