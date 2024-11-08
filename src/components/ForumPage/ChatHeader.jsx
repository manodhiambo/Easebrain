import React from 'react';
import { FaSearch, FaPhone } from 'react-icons/fa';
import GroupHeaderDropdown from './GroupHeaderDropdown';

const ChatHeader = ({ group, chatSearchTerm, onChatSearchTermChange, onEditGroup, onAddMembers, onDeleteGroup }) => (
  <div className="bg-white shadow-md rounded-lg mb-2 p-4" style={{ borderRadius: '10px' }}>
    {/* Container for the entire chat header, styled with background color, shadow, rounded corners, margin, and padding */}
    
    <div className="flex items-center">
      {/* Flex container to align items horizontally */}

      <img src={group.avatar} alt={`${group.name} avatar`} className="w-8 h-8 mr-2 rounded-full" />
      {/* Group avatar displayed as a circular image with margin-right */}

      <div className="flex-grow flex items-center">
        {/* Flex container that grows to fill available space, aligning items horizontally */}

        <span className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold truncate" style={{ maxWidth: 'calc(100% - 3rem)' }}>
          {group.name}
        </span>
        {/* Group name displayed with responsive font sizes and bold weight, truncated if too long */}

        <div className="relative flex-grow ml-6">
          {/* Relative container to position the search icon absolutely within the input field */}

          <input
            type="text"
            value={chatSearchTerm}
            onChange={(e) => onChatSearchTermChange(e.target.value)}
            placeholder="Search messages"
            className="w-full pl-10 py-1 border rounded border-gray-200 outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300"
          />
          {/* Search input field with padding for the search icon, border styling, and focus states */}

          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          {/* Search icon positioned absolutely inside the input field */}
        </div>
      </div>

      <div className="ml-6 flex items-center space-x-4">
        {/* Flex container for the phone icon and dropdown menu, with margin-left and space between items */}

        <FaPhone className="cursor-pointer text-lg" style={{ color: '#DCB93E' }} />
        {/* Phone icon styled with a cursor pointer and custom color */}

        <GroupHeaderDropdown
          groupId={group.id}
          onEditGroup={onEditGroup}
          onAddMembers={onAddMembers}
          onDeleteGroup={onDeleteGroup}
        />
        {/* Dropdown menu component for group actions, passing necessary callbacks as props */}
      </div>
    </div>
  </div>
);

export default ChatHeader;
