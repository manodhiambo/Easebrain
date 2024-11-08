import React, { useState, useEffect } from 'react';
import heroImage from '../../assets/hero-image.jpg';
import emergencyServiceImage from '../../assets/emergency-service.jpg';
import ReusableModal from '../ReusableModal';
import Questionnaire from '../Questionnaire';
import questionsData from '../../assets/questions.json';
import RegisterContent from '../../components/UserRegistration/RegisterContent';

const Hero = () => {
  const [isQuestionnaireModalOpen, setQuestionnaireModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isQuestionnaireComplete, setQuestionnaireComplete] = useState(false);

  const handleButtonClick = (e) => {
    e.preventDefault();
    if (isQuestionnaireComplete) {
      setRegisterModalOpen(true);
    } else {
      setQuestionnaireModalOpen(true);
    }
  };

  const handleQuestionnaireComplete = () => {
    setQuestionnaireModalOpen(false);
    setQuestionnaireComplete(true);
    setRegisterModalOpen(true);
  };

  const handleRegistrationSuccess = () => {
    setRegisterModalOpen(false);
  };

  useEffect(() => {
    if (isQuestionnaireComplete) {
      setQuestionnaireModalOpen(false);
      setRegisterModalOpen(true);
    }
  }, [isQuestionnaireComplete]);

  const glowTextStyle = {
    textShadow: `
      0 0 1px rgba(220, 185, 62, 0.5),
      0 0 2px rgba(220, 185, 62, 0.5),
      0 0 3px rgba(220, 185, 62, 0.3),
      0 0 4px rgba(143, 198, 63, 0.3),
      0 0 6px rgba(143, 198, 63, 0.2),
      0 0 8px rgba(143, 198, 63, 0.1)
    `,
    animation: 'pulse 10s infinite',
  };

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen p-6 bg-gray-800">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Mental Health Awareness"
          className="object-cover w-full h-full opacity-50"
        />
      </div>
      <div className="relative z-10 flex flex-col items-center text-center p-6 bg-gradient-to-t from-gray-800 via-transparent to-transparent rounded-lg">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4" style={glowTextStyle}>
          <span className="text-white">Prioritize Your <br /></span>
          <span className="text-[#8FC63F]">Mental Health </span>
          <span className="text-white">with </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#DCB93E] to-[#8FC63F]">EaseBrain</span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-6 text-white">
          Our platform offers immediate access to professional help, ensuring that you can get the support you need, exactly when you need it. Whether you're facing a crisis or looking for long-term care, EaseBrain is here for you.
        </p>
        <button
          onClick={handleButtonClick}
          className="px-6 py-3 bg-gradient-to-r from-[#DCB93E] to-[#8FC63F] text-white rounded-lg text-xl font-semibold transition duration-300 hover:from-[#8FC63F] hover:to-[#DCB93E] dancing-button"
        >
          Get Started
        </button>
        <div className="mt-12 flex flex-col items-center">
          <img
            src={emergencyServiceImage}
            alt="Emergency Services"
            className="w-64 md:w-80 mx-auto rounded-lg shadow-md opacity-40"
          />
          <p className="mt-4 text-md sm:text-lg text-gray-200 text-center">
            Our emergency services are available 24/7, providing you with instant access to professionals who can guide you through challenging times.
          </p>
        </div>
      </div>

      <style>
        {`
          @keyframes pulse {
            0% {
              text-shadow: 
                0 0 1px rgba(220, 185, 62, 0.7),
                0 0 2px rgba(220, 185, 62, 0.7),
                0 0 3px rgba(220, 185, 62, 0.5),
                0 0 4px rgba(143, 198, 63, 0.5),
                0 0 6px rgba(143, 198, 63, 0.3),
                0 0 8px rgba(143, 198, 63, 0.2);
            }
            50% {
              text-shadow: 
                0 0 2px rgba(220, 185, 62, 0.7),
                0 0 4px rgba(220, 185, 62, 0.7),
                0 0 6px rgba(220, 185, 62, 0.5),
                0 0 8px rgba(143, 198, 63, 0.5),
                0 0 12px rgba(143, 198, 63, 0.3),
                0 0 16px rgba(143, 198, 63, 0.2);
            }
            100% {
              text-shadow: 
                0 0 1px rgba(220, 185, 62, 0.7),
                0 0 2px rgba(220, 185, 62, 0.7),
                0 0 3px rgba(220, 185, 62, 0.5),
                0 0 4px rgba(143, 198, 63, 0.5),
                0 0 6px rgba(143, 198, 63, 0.3),
                0 0 8px rgba(143, 198, 63, 0.2);
            }
          }

          .dancing-button {
            position: relative;
            animation: dance 3s infinite ease-in-out;
          }

          @keyframes dance {
            0%, 100% {
              transform: translateY(0);
            }
            25% {
              transform: translateY(-5px) rotate(-2deg);
            }
            50% {
              transform: translateY(0) rotate(2deg);
            }
            75% {
              transform: translateY(-5px) rotate(-2deg);
            }
          }
        `}
      </style>

      {/* Questionnaire Modal */}
      <ReusableModal isOpen={isQuestionnaireModalOpen} onClose={() => setQuestionnaireModalOpen(false)}>
        <Questionnaire questions={questionsData.questions} onComplete={handleQuestionnaireComplete} />
      </ReusableModal>
      
      {/* Register Modal */}
      <ReusableModal isOpen={isRegisterModalOpen} onClose={() => setRegisterModalOpen(false)}>
        <RegisterContent onSuccess={handleRegistrationSuccess} />
      </ReusableModal>
    </section>
  );
};

export default Hero;
