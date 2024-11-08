import React from 'react';
import { FaSearch, FaPlus, FaEdit } from 'react-icons/fa'; // Importing icons for search, add, and edit functionalities
import Container from '../Container'; // Importing a custom Container component

const GroupList = ({
  groups, // Array of group objects
  selectedGroup, // Currently selected group
  onGroupSelect, // Handler for group selection
  newGroupName, // Value of the new group name input
  onNewGroupNameChange, // Handler for changes in the new group name input
  showGroupForm, // Boolean to toggle the display of the new group form
  onToggleGroupForm, // Handler to toggle the display of the new group form
  onCreateGroup, // Handler to create a new group
  searchTerm, // Value of the search input for groups
  onSearchTermChange, // Handler for changes in the search input
  showAllGroups, // Boolean to toggle displaying all groups or just the first five
  onToggleShowAllGroups, // Handler to toggle displaying all groups
  filteredGroups // Filtered list of groups based on search term
}) => {
  // Determine the groups to display: first 5 or all based on `showAllGroups`
  const groupsToDisplay = showAllGroups ? filteredGroups : filteredGroups.slice(0, 5);

  return (
    <div className="p-0 w-full max-w-md">
      {/* Main container for the group list with padding and maximum width */}
      
      <Container title={(
        <div className="flex flex-col">
          {/* Container title section with flex column layout */}
          
          <div className="flex justify-between items-center">
            {/* Flex container to space out the title and edit icon */}
            
            <span className="text-xs sm:text-sm md:text-base lg:text-lg font-bold truncate">Groups</span>
            {/* Title of the container with responsive font sizes, bold weight, and truncation */}
            
            <FaEdit className="cursor-pointer" onClick={onToggleGroupForm} />
            {/* Edit icon to toggle the group form visibility, with cursor pointer styling */}
          </div>

          {/* Conditionally render the new group form if `showGroupForm` is true */}
          {showGroupForm && (
            <div className="mt-2">
              {/* Margin top for spacing */}
              
              <input
                type="text"
                value={newGroupName}
                onChange={(e) => onNewGroupNameChange(e.target.value)}
                placeholder="New group name"
                className="w-full px-2 py-1 border rounded border-gray-200"
              />
              {/* Input field for new group name with full width, padding, border styling, and rounded corners */}
              
              <button
                onClick={onCreateGroup}
                className="mt-2 w-full px-4 py-2 bg-[#8FC63F] text-white rounded hover:bg-green-600"
              >
                Create Group
              </button>
              {/* Button to create a new group with full width, padding, background color, text color, rounded corners, and hover effect */}
            </div>
          )}
        </div>
      )}>
        <div className="relative mb-2">
          {/* Container for the search input with relative positioning and margin bottom */}
          
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchTermChange(e.target.value)}
            placeholder="Search groups"
            className="w-full pl-10 py-1 border rounded border-gray-200 outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300"
          />
          {/* Search input field with padding for the search icon, border styling, rounded corners, and focus states */}
          
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          {/* Search icon positioned absolutely inside the input field */}
        </div>
        <div className="relative overflow-hidden">
          {/* Container for the group list with relative positioning and hidden overflow */}
          
          <div className={`overflow-y-auto ${showAllGroups ? 'max-h-64' : 'max-h-40'}`}>
            {/* Scrollable container for the groups with conditional max height based on `showAllGroups` */}
            
            {groupsToDisplay.map(group => (
              <button
                key={group.id}
                onClick={() => onGroupSelect(group)}
                className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${group.id === selectedGroup.id ? 'bg-gray-200' : ''}`}
              >
                <div className="flex items-center">
                  {/* Flex container for the group item */}
                  
                  <img src={group.avatar} alt={`${group.name} avatar`} className="w-8 h-8 mr-2 rounded-full" />
                  {/* Group avatar displayed as a circular image with margin-right */}
                  
                  <div className="flex-1">
                    {/* Flex container that grows to fill available space */}
                    
                    <div className="text-sm font-semibold truncate" style={{ maxWidth: '8ch' }}>{group.name}</div>
                    {/* Group name with text truncation */}
                    
                    <div className="text-xs text-gray-500">{group.tagline}</div>
                    {/* Group tagline with smaller text and gray color */}
                  </div>
                </div>
              </button>
            ))}
          </div>
          
          {/* Button to show more groups if there are more than 5 and `showAllGroups` is false */}
          {!showAllGroups && filteredGroups.length > 5 && (
            <button
              className="w-full text-[#DCB93E] text-center mt-2"
              onClick={onToggleShowAllGroups}
            >
              Show More <FaPlus className="inline" /> {/* Plus icon for the show more button */}
            </button>
          )}
        </div>
      </Container>
    </div>
  );
};

export default GroupList;
