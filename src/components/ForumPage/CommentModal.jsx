import React from 'react';
import { FaTrash, FaComment, FaTimes } from 'react-icons/fa';

const CommentModal = ({ onClose, comments, newComment, setNewComment, onAddComment, onDeleteComment }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
        {/* Close button at the top right */}
        <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-800" onClick={onClose}>
          <FaTimes />
        </button>
        {/* Modal header */}
        <h2 className="text-lg font-bold mb-4">Comments</h2>
        {/* Comment list container */}
        <div className="overflow-y-auto max-h-64 mb-4">
          {comments && comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="mb-2 flex items-start">
                {/* User avatar */}
                <img
                  src={comment.avatar || 'https://randomuser.me/api/portraits/men/1.jpg'}
                  alt={`${comment.userId} avatar`}
                  className="w-8 h-8 rounded-full mr-2"
                />
                {/* Comment content */}
                <div className="flex-1 p-2 bg-gray-100 rounded-lg">
                  <div className="font-semibold flex justify-between">
                    {comment.userId}
                    {/* Delete comment button */}
                    <FaTrash
                      className="cursor-pointer text-red-500 hover:text-red-700"
                      onClick={() => onDeleteComment(comment.id)}
                    />
                  </div>
                  <div className="text-gray-800 break-words overflow-wrap break-all">
                    {comment.text}
                  </div>
                  {/* Reply count */}
                  <div className="flex items-center space-x-1 mt-1">
                    <FaComment className="cursor-pointer text-gray-500 hover:text-gray-700" />
                    <span className="text-gray-600">{comment.replies.length}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">No comments yet.</div>
          )}
        </div>
        {/* Text area for new comment */}
        <textarea
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          rows="3"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        {/* Action buttons */}
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            onClick={onClose} // Ensure onClose is correctly passed and works
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-yellow-200 text-purple-700 rounded-lg hover:bg-yellow-300"
            onClick={onAddComment}
          >
            Add Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
