import React, { useRef, useEffect, useState } from 'react';
import { FaSmile, FaPaperclip, FaPaperPlane, FaMicrophone, FaTimes } from 'react-icons/fa';

const MessageInput = ({ newMessage, onNewMessageChange, onSendMessage, onFileChange, previewFiles, onRemoveFile }) => {
  const fileInputRef = useRef(null); // Ref to handle file input click
  const [hasFiles, setHasFiles] = useState(false); // State to check if there are files to be uploaded
  const [message, setMessage] = useState(newMessage); // State to handle the message input

  // Sync the message state with newMessage prop
  useEffect(() => {
    setMessage(newMessage);
  }, [newMessage]);

  // Update hasFiles state when previewFiles changes
  useEffect(() => {
    setHasFiles(previewFiles.length > 0);
  }, [previewFiles]);

  // Handle text input change
  const handleInput = (e) => {
    setMessage(e.target.value);
    onNewMessageChange(e.target.value);
  };

  // Clear placeholder text on focus
  const handleFocus = () => {
    if (message === 'Type a message') {
      setMessage('');
    }
  };

  // Set placeholder text if input is empty on blur
  const handleBlur = () => {
    if (message.trim() === '') {
      setMessage('Type a message');
    }
  };

  // Trigger file input click
  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    onFileChange(files);
    setHasFiles(true);
  };

  // Send message if there's text or files
  const handleSendMessage = () => {
    if (message.trim() || hasFiles) {
      onSendMessage(); // Include file handling logic in the onSendMessage callback
      setMessage('');
      onNewMessageChange('');
    }
  };

  return (
    <div className="sticky bottom-5 p-2 bg-white shadow rounded" style={{ borderRadius: '10px', marginBottom: '20px' }}>
      <div className="relative flex items-center space-x-2">
        <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="User avatar" className="w-8 h-8 rounded-full" />
        <FaSmile className="cursor-pointer text-gray-500 text-xl" />
        <FaPaperclip className="cursor-pointer text-gray-500 text-xl" onClick={handleFileClick} />
        <input
          ref={fileInputRef}
          type="file"
          multiple
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <textarea
          value={message}
          onChange={handleInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Type a message"
          className="flex-1 border border-gray-300 rounded-lg px-2 py-1 outline-none bg-gray-100 focus:border-gray-500 focus:bg-white focus:ring-0"
          style={{
            minHeight: '40px',
            maxHeight: '100px',
            overflow: 'hidden',
            direction: 'ltr', // Ensures left-to-right text direction
            textAlign: 'left', // Ensures text is aligned to the left
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
            lineHeight: '1.5', // Ensures better cursor movement
            resize: 'none' // Prevents manual resizing
          }}
        />
        {(message.trim() || hasFiles) ? (
          <FaPaperPlane className="cursor-pointer text-blue-500 text-xl" onClick={handleSendMessage} />
        ) : (
          <FaMicrophone className="cursor-pointer text-gray-500 text-xl" />
        )}
        <FaTimes className="cursor-pointer text-gray-500 text-xl" onClick={() => { setMessage(''); onNewMessageChange(''); }} />
      </div>
      {previewFiles.length > 0 && (
        <div className="mt-2">
          <div className="text-gray-700">Files to be uploaded:</div>
          <div className="flex space-x-2 mt-1 overflow-x-auto">
            {previewFiles.map((file, index) => (
              <div key={index} className="relative">
                <img src={file} alt={`Preview ${index}`} className="w-24 h-24 object-cover rounded" />
                <button
                  className="absolute top-0 right-0 text-red-500"
                  onClick={() => onRemoveFile(index)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageInput;
