import React from 'react';

const EarthBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <div className="absolute inset-0">
        <img
          src="/images/earth-background.jpg"
          alt="Earth at night from space"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>
    </div>
  );
};

export default EarthBackground;
