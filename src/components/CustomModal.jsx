import React from 'react';
import Modal from 'react-modal';

// Ensure that Modal is properly set up with root element
if (typeof window !== 'undefined') {
  Modal.setAppElement('#root'); // Or whatever your root element ID is
}

const CustomModal = ({
  isOpen = false,
  onRequestClose = () => {},
  title = '',
  content = null,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={title}
      className="modal"
      overlayClassName="overlay"
    >
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="flex flex-col space-y-4">
        {content}
      </div>
      <button
        onClick={onRequestClose}
        className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg mt-4"
        aria-label="Close modal"
      >
        Close
      </button>
    </Modal>
  );
};

export default CustomModal;
