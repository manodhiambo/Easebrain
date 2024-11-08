// src/components/Layout.jsx
import React from 'react';
import Navbar from './Navbar';
import BackgroundElements from './BackgroundElements';

const Layout = ({ user, leftContent, rightContent }) => {
  return (
    <div className="relative">
      <BackgroundElements />
      <Navbar />
      <div className="relative container mx-auto flex flex-col items-center min-h-screen px-4 py-4 mt-5" style={{ maxWidth: 1020 }}>
        <div className="flex flex-wrap justify-center w-full">
          <div className="hidden sm:block sm:w-1/3 mb-6 sm:mb-0 order-2 sm:order-1">
            {leftContent}
          </div>
          <div className="w-full sm:w-2/3 flex flex-col items-start pl-0 sm:pl-10 order-1 sm:order-2 z-10">
            {rightContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
