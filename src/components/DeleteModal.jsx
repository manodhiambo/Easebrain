import React from 'react';
import Modal from 'react-modal';

const DeleteModal = ({
  isOpen,
  onRequestClose,
  onDelete,
  deleteTarget,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Delete Confirmation"
      className="modal confirm-delete-modal"
      overlayClassName="overlay"
    >
      <h2 className="text-lg font-bold">
        Are you sure you want to delete this {deleteTarget}?
      </h2>
      <div className="mt-4 flex justify-end">
        <button
          onClick={onDelete}
          className="bg-red-500 text-white p-2 rounded-lg"
        >
          Yes, Delete
        </button>
        <button
          onClick={onRequestClose}
          className="bg-gray-300 text-gray-800 p-2 rounded-lg ml-2"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
