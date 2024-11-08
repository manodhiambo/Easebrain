import React from 'react';
import { FaTimes } from 'react-icons/fa';

const ReusableModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="relative bg-white rounded-lg shadow-lg max-w-md mx-auto z-10 overflow-y-auto" style={{ maxHeight: '80vh' }}>
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <FaTimes size={24} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default ReusableModal;
