import React from 'react';

const ShareModal = ({ onClose, onShare, options }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-lg font-bold mb-4">Share Message</h2>
        <div className="space-y-2">
          {options.map((option) => (
            <button
              key={option}
              className="w-full px-4 py-2 bg-gray-100 text-gray-800 rounded-lg"
              onClick={() => onShare(option)}
            >
              Share on {option}
            </button>
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
