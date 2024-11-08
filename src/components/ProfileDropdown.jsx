// src/components/ProfileDropdown.jsx
import React from 'react';
import { FaEdit, FaUserMd, FaExchangeAlt, FaHandsHelping, FaQuestionCircle, FaRedo, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProfileDropdown = ({ onMouseEnter, onMouseLeave, onResetQuestions }) => {
  const dropdownItemClasses = "block w-full px-4 py-2 text-gray-800 hover:bg-gray-200 active:bg-gray-300 flex items-center";

  return (
    <div 
      className="relative"
      onMouseEnter={onMouseEnter} 
      onMouseLeave={onMouseLeave}
    >
      <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 shadow-lg">
        <Link to="/edit-profile" className={dropdownItemClasses}>
          <FaEdit className="mr-2" />
          Edit Profile
        </Link>
        <Link to="/become-volunteer" className={dropdownItemClasses}>
          <FaHandsHelping className="mr-2" />
          Become Volunteer
        </Link>
        <Link to="/become-therapist" className={dropdownItemClasses}>
          <FaQuestionCircle className="mr-2" />
          Wanna be Therapist
        </Link>
        <a href="/logout" className={dropdownItemClasses}>
          <FaSignOutAlt className="mr-2" />
          Logout
        </a>
      </div>
    </div>
  );
};

export default ProfileDropdown;
