import React, { useState, useRef, useEffect } from 'react';
import easebrainlogo from '../../assets/easebrainlogo.png';
import ReusableModal from '../../components/ReusableModal';
import Questionnaire from '../Questionnaire';
import RegisterContent from '../UserRegistration/RegisterContent';
import LoginContent from '../UserLogin/LoginContent'; // Import LoginContent
import questionsData from '../../assets/questions.json';

const LandingNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isGetStartedModalOpen, setIsGetStartedModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // Add state for Login modal
  const [isQuestionnaireComplete, setIsQuestionnaireComplete] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleGetStartedClick = (e) => {
    e.preventDefault();
    setIsOpen(false);
    if (isQuestionnaireComplete) {
      setIsRegisterModalOpen(true);
    } else {
      setIsGetStartedModalOpen(true);
    }
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    setIsRegisterModalOpen(true);
    setIsOpen(false);
  };

  const handleLoginClick = (e) => { // Add handler for Login button
    e.preventDefault();
    setIsLoginModalOpen(true);
    setIsOpen(false);
  };

  const handleQuestionnaireComplete = () => {
    setIsQuestionnaireComplete(true);
    setIsGetStartedModalOpen(false);  // Close the Get Started modal
    setIsRegisterModalOpen(true);     // Open the Register modal
  };

  const handleRegistrationSuccess = () => {
    setIsRegisterModalOpen(false);
  };

  const handleLoginSuccess = () => { // Add success handler for Login
    setIsLoginModalOpen(false);
  };

  return (
    <>
      <nav className="w-full px-6 py-4 flex items-center sticky top-0 z-50 bg-white backdrop-blur-md" style={{ height: '60px' }}>
        <img
          src={easebrainlogo}
          alt="EaseBrain Logo"
          className="w-28 sm:w-32 md:w-36 lg:w-42"
        />
        <div className="flex-grow" />
        <div className="hidden md:flex md:items-center md:space-x-4">
          <button
            onClick={handleLoginClick}
            className="px-4 py-2 bg-gradient-to-r from-[#DCB93E] to-[#8FC63F] text-white rounded-md transition duration-300 hover:from-[#8FC63F] hover:to-[#DCB93E]"
          >
            Login
          </button>
          <button
            onClick={handleRegisterClick}
            className="px-4 py-2 bg-gradient-to-r from-white to-black text-white rounded-md transition duration-300 hover:from-black hover:to-white"
          >
            Register
          </button>
          <button
            onClick={handleGetStartedClick}
            className="px-4 py-2 border-2 border-[#8FC63F] text-[#8FC63F] rounded-md transition duration-300 hover:bg-[#8FC63F] hover:text-white"
          >
            Get Started
          </button>
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-gray-500 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
            </svg>
          </button>
        </div>
        {isOpen && (
          <div
            ref={dropdownRef}
            className="absolute top-full left-0 w-full bg-white bg-opacity-90 shadow-lg md:hidden"
          >
            <button
              onClick={handleLoginClick}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-200 w-full"
            >
              Login
            </button>
            <button
              onClick={handleRegisterClick}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-200 w-full"
            >
              Register
            </button>
            <button
              onClick={handleGetStartedClick}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-200 w-full"
            >
              Get Started
            </button>
          </div>
        )}
      </nav>

      {/* Get Started Modal Component */}
      <ReusableModal isOpen={isGetStartedModalOpen} onClose={() => setIsGetStartedModalOpen(false)}>
        <Questionnaire questions={questionsData.questions} onComplete={handleQuestionnaireComplete} />
      </ReusableModal>

      {/* Register Modal Component */}
      <ReusableModal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)}>
        <RegisterContent onSuccess={handleRegistrationSuccess} />
      </ReusableModal>

      {/* Login Modal Component */}
      <ReusableModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)}>
        <LoginContent onSuccess={handleLoginSuccess} />
      </ReusableModal>
    </>
  );
};

export default LandingNavbar;
