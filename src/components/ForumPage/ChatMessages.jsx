import React, { useState, useCallback } from 'react';
import { FaComment, FaShare, FaTrash, FaThumbsUp, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import CommentModal from './CommentModal';
import DeleteModal from '../DeleteModal';
import ShareModal from './ShareModal';

const ChatMessages = ({ chats, onShare, onDelete }) => {
  const [likedMessages, setLikedMessages] = useState(new Set());
  const [likeCounts, setLikeCounts] = useState(
    chats.reduce((acc, chat) => ({ ...acc, [chat.message]: 0 }), {})
  );
  const [comments, setComments] = useState(
    chats.reduce((acc, chat) => ({ ...acc, [chat.message]: [] }), {})
  );
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState('');
  const [newComment, setNewComment] = useState('');
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState('message');
  const [expandedComments, setExpandedComments] = useState(new Set());

  // Handle liking a message
  const handleLike = useCallback((message) => {
    setLikedMessages((prevLikes) => {
      const updatedLikes = new Set(prevLikes);
      const currentCount = likeCounts[message] || 0;
      const newCount = updatedLikes.has(message) ? currentCount - 1 : currentCount + 1;

      setLikeCounts((prevCounts) => ({
        ...prevCounts,
        [message]: newCount,
      }));

      updatedLikes.has(message) ? updatedLikes.delete(message) : updatedLikes.add(message);
      return updatedLikes;
    });
  }, [likeCounts]);

  // Open the comment modal for a specific message
  const handleCommentClick = useCallback((message) => {
    setSelectedMessage(message);
    setShowCommentModal(true);
  }, []);

  // Add a new comment to the selected message
  const handleAddComment = useCallback(() => {
    if (newComment.trim()) {
      setComments((prevComments) => ({
        ...prevComments,
        [selectedMessage]: [
          ...(prevComments[selectedMessage] || []),
          {
            id: Date.now(),
            userId: 'CurrentUser',
            text: newComment,
            avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
            likes: 0,
            replies: [],
          },
        ],
      }));
      setNewComment('');
      setExpandedComments((prevExpanded) => new Set(prevExpanded).add(selectedMessage));
    }
  }, [newComment, selectedMessage]);

  // Close the comment modal
  const handleCloseCommentModal = useCallback(() => {
    setShowCommentModal(false);
    setSelectedMessage('');
  }, []);

  // Open the delete comment modal for a specific comment
  const handleOpenDeleteCommentModal = useCallback((commentId) => {
    setCommentToDelete(commentId);
    setDeleteTarget('comment');
    setShowDeleteModal(true);
  }, []);

  // Open the delete message modal for a specific message
  const handleOpenDeleteMessageModal = useCallback((message) => {
    setSelectedMessage(message);
    setDeleteTarget('message');
    setShowDeleteModal(true);
  }, []);

  // Close the delete modal
  const handleCloseDeleteModal = useCallback(() => {
    setShowDeleteModal(false);
    setSelectedMessage('');
    setCommentToDelete(null);
    setDeleteTarget('message');
  }, []);

  // Delete a comment from the selected message
  const handleDeleteComment = useCallback(() => {
    if (selectedMessage && commentToDelete) {
      setComments((prevComments) => ({
        ...prevComments,
        [selectedMessage]: (prevComments[selectedMessage] || []).filter(
          (comment) => comment.id !== commentToDelete
        ),
      }));
      handleCloseDeleteModal();
    }
  }, [selectedMessage, commentToDelete, handleCloseDeleteModal]);

  // Delete a message
  const handleDeleteMessage = useCallback(() => {
    if (selectedMessage) {
      if (onDelete) {
        onDelete(selectedMessage);
      }
      handleCloseDeleteModal();
    }
  }, [selectedMessage, onDelete, handleCloseDeleteModal]);

  // Open the share modal for a specific message
  const handleOpenShareModal = useCallback((message) => {
    setSelectedMessage(message);
    setShowShareModal(true);
  }, []);

  // Close the share modal
  const handleCloseShareModal = useCallback(() => {
    setShowShareModal(false);
    setSelectedMessage('');
  }, []);

  // Handle sharing the message through different platforms
  const handleShare = useCallback((message, option) => {
    const url = window.location.href;
    const text = `Check out this message: "${message}"`;

    let shareUrl = '';
    switch (option) {
      case 'Facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'Twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'LinkedIn':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'Email':
        shareUrl = `mailto:?subject=${encodeURIComponent('Check this out')}&body=${encodeURIComponent(text + '\n' + url)}`;
        break;
      default:
        break;
    }
    window.open(shareUrl, '_blank');
    setShowShareModal(false);
  }, []);

  // Share options available in the share modal
  const shareOptions = ['Facebook', 'Twitter', 'LinkedIn', 'Email'];

  // Toggle the expanded state of comments for a message
  const handleToggleComments = useCallback((message) => {
    setExpandedComments((prevExpanded) => {
      const newExpanded = new Set(prevExpanded);
      if (newExpanded.has(message)) {
        newExpanded.delete(message);
      } else {
        newExpanded.add(message);
      }
      return newExpanded;
    });
  }, []);

  return (
    <div className="flex-1 overflow-y-auto mb-5">
      <div>
        {chats.length === 0 ? (
          <div className="text-center text-gray-500 bg-gray-100 p-4 rounded-lg">
            No messages yet.
          </div>
        ) : (
          chats.map((chat, index) => (
            <div
              key={index}
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
                  {/* Render attachment based on type */}
                  {chat.attachment && (
                    <div className="mt-2">
                      {chat.attachment.type.startsWith('image/') && (
                        <img
                          src={chat.attachment.url}
                          alt="Attachment"
                          className="w-full h-auto rounded-lg"
                        />
                      )}
                      {chat.attachment.type.startsWith('video/') && (
                        <video controls className="w-full h-auto rounded-lg">
                          <source src={chat.attachment.url} type={chat.attachment.type} />
                          Your browser does not support the video tag.
                        </video>
                      )}
                      {chat.attachment.type.startsWith('audio/') && (
                        <audio controls className="w-full rounded-lg">
                          <source src={chat.attachment.url} type={chat.attachment.type} />
                          Your browser does not support the audio element.
                        </audio>
                      )}
                      {chat.attachment.type.startsWith('application/') && (
                        <a href={chat.attachment.url} download className="text-blue-600 underline">
                          Download attachment
                        </a>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2 text-sm mt-2">
                  <div className="flex items-center space-x-1">
                    <FaThumbsUp
                      className={`cursor-pointer ${likedMessages.has(chat.message) ? 'text-blue-500' : 'text-gray-500'}`}
                      onClick={() => handleLike(chat.message)}
                      aria-label="Like"
                    />
                    <span className="text-gray-600">{likeCounts[chat.message] || 0}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FaComment
                      className="cursor-pointer text-gray-500"
                      onClick={() => handleCommentClick(chat.message)}
                      aria-label="Comment"
                    />
                    <span className="text-gray-600">{(comments[chat.message] || []).length}</span>
                  </div>
                  <FaShare
                    className="cursor-pointer text-gray-500"
                    onClick={() => handleOpenShareModal(chat.message)}
                    aria-label="Share"
                  />
                  {chat.isOwner && (
                    <FaTrash
                      className="cursor-pointer text-red-500"
                      onClick={() => handleOpenDeleteMessageModal(chat.message)}
                      aria-label="Delete"
                    />
                  )}
                </div>
                {/* Render comments for the message */}
                {comments[chat.message] && (
                  <div className="mt-2 space-y-2">
                    {comments[chat.message].length > 0 && (
                      <div className="flex items-center space-x-1 cursor-pointer text-gray-500" onClick={() => handleToggleComments(chat.message)}>
                        {expandedComments.has(chat.message) ? <FaChevronUp aria-label="Collapse comments" /> : <FaChevronDown aria-label="Expand comments" />}
                        <span>Comments ({comments[chat.message].length})</span>
                      </div>
                    )}
                    {(expandedComments.has(chat.message) || comments[chat.message].length === 0) && comments[chat.message].map((comment) => (
                      <div
                        key={comment.id}
                        className="relative p-2 rounded-lg bg-gray-100 flex items-start"
                      >
                        <img
                          src={comment.avatar || 'https://randomuser.me/api/portraits/men/1.jpg'}
                          alt={`${comment.userId} avatar`}
                          className="w-8 h-8 rounded-full mr-2"
                        />
                        <div className="flex-1 flex flex-col">
                          <div className="flex-1 bg-white p-2 rounded-lg">
                            <div className="font-semibold">{comment.userId}</div>
                            <div className="text-gray-800 break-words overflow-wrap break-all">
                              {comment.text}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 text-sm mt-1">
                            <div className="flex items-center space-x-1">
                              <FaThumbsUp className="cursor-pointer text-gray-500" aria-label="Like" />
                              <span className="text-gray-600">{comment.likes}</span>
                            </div>
                            <FaComment
                              className="cursor-pointer text-gray-500"
                              onClick={() => handleCommentClick(comment.id)}
                              aria-label="Reply"
                            />
                            {comment.isOwner && (
                              <FaTrash
                                className="cursor-pointer text-red-500"
                                onClick={() => handleOpenDeleteCommentModal(comment.id)}
                                aria-label="Delete comment"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      {/* Render modals */}
      {showCommentModal && (
        <CommentModal
          onClose={handleCloseCommentModal}
          comments={comments[selectedMessage]}
          newComment={newComment}
          setNewComment={setNewComment}
          onAddComment={handleAddComment}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          isOpen={showDeleteModal}
          onRequestClose={handleCloseDeleteModal}
          onDelete={deleteTarget === 'comment' ? handleDeleteComment : handleDeleteMessage}
          deleteTarget={deleteTarget}
        />
      )}
      {showShareModal && (
        <ShareModal
          onClose={handleCloseShareModal}
          onShare={(option) => handleShare(selectedMessage, option)}
          options={shareOptions}
        />
      )}
    </div>
  );
};

export default ChatMessages;
