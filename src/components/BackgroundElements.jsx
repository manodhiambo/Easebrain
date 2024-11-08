import React from 'react';
import easebrainLogo from '../assets/easebrainnowordlogo.png';

const BackgroundElements = () => {
  // Background image positions
  const logoPositions = [
    { top: '5%', left: '5%' },
    { top: '5%', right: '5%' },
    { top: '50%', left: '5%', transform: 'translateY(-50%)' },
    { top: '50%', right: '5%', transform: 'translateY(-50%)' },
    { bottom: '5%', left: '5%' },
    { bottom: '5%', right: '5%' },
  ];

  return (
    <div className="fixed inset-0 z-0">
      <div className="absolute inset-0 bg-[#5d5c5e] opacity-10"></div>
      {/* Gradient background with mixed colors and opacity */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-slate-300 to-secondary opacity-50"></div>
      {/* Background logos */}
      <div className="absolute inset-0 flex justify-between items-center opacity-10">
        {logoPositions.map((position, index) => (
          <img
            key={index}
            src={easebrainLogo} // Use the imported logo image
            alt="Logo"
            className="m-6 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40" // Responsive sizes
            style={{
              position: 'absolute',
              ...position
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default BackgroundElements;
