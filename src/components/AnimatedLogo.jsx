// src/components/AnimatedLogo.jsx
import React from 'react';
import logoSrc from '../assets/easebrainnowordlogo.png'; // Adjust the path as needed

const AnimatedLogo = () => {
  return (
    <div className="relative flex justify-center items-center min-h-screen">
      <img
        src={logoSrc}
        alt="EaseBrain Logo"
        className="animated-logo"
      />
      <style jsx>{`
        .animated-logo {
          width: 150px;
          height: 150px;
          animation: flap 3s ease-in-out infinite;
        }

        @keyframes flap {
          0% {
            transform: scale(0.8) rotate(-10deg);
            opacity: 0;
          }
          50% {
            transform: scale(1) rotate(10deg);
            opacity: 1;
          }
          100% {
            transform: scale(0.8) rotate(-10deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedLogo;
