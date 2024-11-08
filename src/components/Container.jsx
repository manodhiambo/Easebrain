import React, { useState } from 'react';

const Container = ({ title, children, scrollable }) => {
  const [showAll, setShowAll] = useState(false);
  // Ensure children is always an array before using slice
  const childrenArray = React.Children.toArray(children);
  const visibleChildren = showAll ? childrenArray : childrenArray.slice(0, 4);

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-4 mb-4">
      {title && <h2 className="text-xl font-bold mb-2">{title}</h2>}
      <hr className="my-2" />
      <div className={scrollable ? 'max-h-64 overflow-y-auto' : ''}>
        {visibleChildren}
      </div>
      {childrenArray.length > 4 && (
        <div className="text-center mt-2">
          <button
            className="text-blue-500 hover:underline"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Less' : 'More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Container;
