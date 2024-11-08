import React, { useState, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FaEllipsisV } from 'react-icons/fa';
import DeleteModal from '../DeleteModal';

const GroupHeaderDropdown = ({ groupId, onEditGroup, onAddMembers, onDeleteGroup }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(prev => !prev);

  const handleDeleteGroup = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (typeof onDeleteGroup === 'function') {
      onDeleteGroup(groupId);
    } else {
      console.error('onDeleteGroup is not a function');
    }
    setIsDeleteModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <FaEllipsisV
        className="text-gray-500 text-lg cursor-pointer"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="true"
      />
      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-56 z-50">
          <button
            onClick={onEditGroup}
            className="w-full px-4 py-2 text-left hover:bg-gray-100"
          >
            Edit Group
          </button>
          <button
            onClick={onAddMembers}
            className="w-full px-4 py-2 text-left hover:bg-gray-100"
          >
            Add Members
          </button>
          <button
            onClick={handleDeleteGroup}
            className="w-full px-4 py-2 text-left hover:bg-gray-100 text-red-600"
          >
            Delete Group
          </button>
        </div>
      )}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onRequestClose={handleCancelDelete}
        onDelete={handleConfirmDelete}
        deleteTarget="group"
      />
    </div>
  );
};

GroupHeaderDropdown.propTypes = {
  groupId: PropTypes.number.isRequired,
  onEditGroup: PropTypes.func.isRequired,
  onAddMembers: PropTypes.func.isRequired,
  onDeleteGroup: PropTypes.func.isRequired,
};

export default GroupHeaderDropdown;
