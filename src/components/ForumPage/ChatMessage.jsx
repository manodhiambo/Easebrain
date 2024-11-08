import React from 'react';
import { FaComment, FaShare, FaTrash, FaThumbsUp } from 'react-icons/fa';

const getAttachmentPreview = (file, index) => {
  const extension = file.split('.').pop().toLowerCase();

  switch (extension) {
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return <img src={file} alt={`Attachment ${index}`} className="w-32 h-32 object-cover rounded" />;
    case 'mp4':
    case 'webm':
      return <video controls src={file} className="w-32 h-32 object-cover rounded" />;
    case 'mp3':
    case 'wav':
      return <audio controls src={file} className="w-full mt-2" />;
    case 'pdf':
    case 'doc':
    case 'docx':
      return (
        <div className="flex items-center space-x-2 mt-2">
          <span className="text-gray-600">Document:</span>
          <a href={file} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
            View Document
          </a>
        </div>
      );
    default:
      return <div className="text-gray-600">Unsupported file type</div>;
  }
};

const ChatMessage = ({
  chat,
  likedMessages,
  likeCounts,
  handleLike,
  handleCommentClick,
  handleOpenShareModal,
  handleOpenDeleteMessageModal,
  comments // Added comments to the props
}) => {
  return (
    <div
      className="relative p-4 my-2 rounded-lg shadow-lg bg-white flex items-start"
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
    >
      <img
        src={chat.avatar || 'https://randomuser.me/api/portraits/men/1.jpg'}
        alt={`${chat.user} avatar`}
        className="w-10 h-10 rounded-full mr-3"
      />
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-2 bg-gray-100 rounded-lg">
          <div className="font-semibold">{chat.user}</div>
          <div className="text-gray-800 break-words overflow-wrap break-all">
            {chat.message}
          </div>
          {/* Display attachments */}
          {chat.attachments && chat.attachments.length > 0 && (
            <div className="mt-2">
              {chat.attachments.map((file, index) => (
                <div key={index} className="relative mb-2">
                  {getAttachmentPreview(file, index)}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2 text-sm mt-2">
          <div className="flex items-center space-x-1">
            <FaThumbsUp
              className={`cursor-pointer ${likedMessages.has(chat.message) ? 'text-blue-500' : 'text-gray-500'}`}
              onClick={() => handleLike(chat.message)}
            />
            <span className="text-gray-600">{likeCounts[chat.message] || 0}</span>
          </div>
          <div className="flex items-center space-x-1">
            <FaComment
              className="cursor-pointer text-gray-500"
              onClick={() => handleCommentClick(chat.message)}
            />
            <span className="text-gray-600">{(comments[chat.message] || []).length}</span>
          </div>
          <FaShare
            className="cursor-pointer text-gray-500"
            onClick={() => handleOpenShareModal(chat.message)}
          />
          {chat.isOwner && (
            <FaTrash
              className="cursor-pointer text-red-500"
              onClick={() => handleOpenDeleteMessageModal(chat.message)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
