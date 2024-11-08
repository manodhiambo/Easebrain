import React from 'react';
import LandingNavbar from '../components/LandingPage/LandingNavbar';
import Hero from '../components/LandingPage/Hero'; // Import the Hero component

const LandingPage = () => {
  return (
    <div className="relative flex flex-col min-h-screen">
      <LandingNavbar /> {/* Add the navbar at the top */}
      <Hero /> {/* Add Hero section */}
      <div className="mt-16 z-10 w-full max-w-4xl mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 text-black text-center">
          Welcome to EaseBrain
        </h1>
      </div>
    </div>
  );
};

export default LandingPage;
