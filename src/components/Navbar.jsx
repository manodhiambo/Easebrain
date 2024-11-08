import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaPhone, FaEnvelope, FaExclamationTriangle, FaComments, FaBell, FaUser } from 'react-icons/fa';
import easebrainlogo from '../assets/easebrainlogo.png'; // Importing the logo image
import ProfileDropdown from './ProfileDropdown'; // Importing the ProfileDropdown component

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true); // State to control the visibility of the navbar
  const [lastScrollY, setLastScrollY] = useState(0); // State to keep track of the last scroll position
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to control the visibility of the profile dropdown
  const [dropdownClicked, setDropdownClicked] = useState(false); // State to check if the dropdown was clicked
  const [dropdownTimeout, setDropdownTimeout] = useState(null); // State to store the timeout ID for closing the dropdown
  const dropdownRef = useRef(null); // Ref to track the dropdown element

  const location = useLocation(); // Hook to get the current location

  // Function to handle scroll events
  const handleScroll = useCallback(() => {
    if (window.scrollY > lastScrollY) {
      // Hide navbar on scroll down
      setShowNavbar(false);
    } else {
      // Show navbar on scroll up
      setShowNavbar(true);
    }
    setLastScrollY(window.scrollY);
  }, [lastScrollY]);

  // Add and remove scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  // Function to keep the dropdown open while hovering
  const handleMouseEnter = () => {
    if (!dropdownClicked) {
      setDropdownOpen(true);
    }
    clearTimeout(dropdownTimeout);
  };

  // Function to close the dropdown if not clicked
  const handleMouseLeave = () => {
    if (!dropdownClicked) {
      setDropdownOpen(false);
    }
  };

  // Function to toggle the dropdown's visibility on click
  const handleDropdownClick = () => {
    setDropdownClicked((prev) => !prev);
    setDropdownOpen(true);

    if (!dropdownClicked) {
      clearTimeout(dropdownTimeout);
      const timeout = setTimeout(() => {
        setDropdownOpen(false);
        setDropdownClicked(false);
      }, 5000); // Close the dropdown after 5 seconds if clicked
      setDropdownTimeout(timeout);
    } else {
      clearTimeout(dropdownTimeout);
      setDropdownOpen(false);
      setDropdownClicked(false);
    }
  };

  // Function to close the dropdown if clicking outside of it
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
      setDropdownClicked(false);
      clearTimeout(dropdownTimeout);
    }
  };

  // Add and remove click event listener for outside clicks
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Helper function to get the appropriate link classes for active and inactive states
  const getLinkClasses = (path) => (
    `flex flex-col items-center hover:text-gray-700 ${location.pathname === path ? 'text-green-800' : 'text-gray-500'}`
  );

  const containerClasses = "container mx-auto flex justify-between items-center px-4 py-2"; // Common container classes

  return (
    <div>
      {/* Navbar for desktop view */}
      <nav className={`bg-white w-full sticky top-0 z-50 transition-transform duration-300 ${showNavbar ? 'transform translate-y-0' : 'transform -translate-y-full'}`}>
        <div className={`${containerClasses}`} style={{ maxWidth: '1020px' }}>
          <Link to="/homepage">
            <img src={easebrainlogo} alt="EaseBrain Logo" className="w-36 cursor-pointer" />
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/Homepage" className={getLinkClasses('/Homepage')}>
              <FaHome className="text-2xl" />
              <span className="text-sm mt-1">Home</span>
            </Link>
            <Link to="/calls" className={getLinkClasses('/calls')}>
              <FaPhone className="text-2xl" />
              <span className="text-sm mt-1">Calls</span>
            </Link>
            <Link to="/messages" className={getLinkClasses('/messages')}>
              <FaEnvelope className="text-2xl" />
              <span className="text-sm mt-1">Messages</span>
            </Link>
            <Link to="/emergencies" className={getLinkClasses('/emergencies')}>
              <FaExclamationTriangle className="text-2xl" />
              <span className="text-sm mt-1">Emergencies</span>
            </Link>
            <Link to="/forum" className={getLinkClasses('/forum')}>
              <FaComments className="text-2xl" />
              <span className="text-sm mt-1">Forum</span>
            </Link>
          </div>
          <div className="relative flex items-center space-x-8">
            <FaBell className="text-2xl hover:text-gray-700" />
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              ref={dropdownRef}
            >
              <FaUser
                className="text-2xl hover:text-gray-700 cursor-pointer"
                onClick={handleDropdownClick}
              />
              {dropdownOpen && (
                <ProfileDropdown onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Navbar for mobile view */}
      <div className={`md:hidden fixed bottom-0 left-0 right-0 bg-white z-50 transition-transform duration-300 ${showNavbar ? 'transform translate-y-0' : 'transform translate-y-full'}`}>
        <div className={`${containerClasses}`} style={{ maxWidth: '1020px' }}>
          <Link to="/Homepage" className={getLinkClasses('/Homepage')}>
            <FaHome className="text-2xl" />
            <span className="text-sm mt-1">Home</span>
          </Link>
          <Link to="/calls" className={getLinkClasses('/calls')}>
            <FaPhone className="text-2xl" />
            <span className="text-sm mt-1">Calls</span>
          </Link>
          <Link to="/messages" className={getLinkClasses('/messages')}>
            <FaEnvelope className="text-2xl" />
            <span className="text-sm mt-1">Messages</span>
          </Link>
          <Link to="/emergencies" className={getLinkClasses('/emergencies')}>
            <FaExclamationTriangle className="text-2xl" />
            <span className="text-sm mt-1">Emergencies</span>
          </Link>
          <Link to="/forum" className={getLinkClasses('/forum')}>
            <FaComments className="text-2xl" />
            <span className="text-sm mt-1">Forum</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
