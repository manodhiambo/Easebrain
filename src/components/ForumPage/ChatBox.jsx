import React, { useState, useEffect } from 'react';
import Container from '../Container';

const dummyChats = {
  default: ['Hello! This is the default group.', 'Feel free to chat here.'],
  group1: ['Welcome to group 1.', 'Group 1 is active!'],
  group2: ['This is group 2.', 'Start chatting in group 2.']
};

const ChatBox = ({ selectedGroup }) => {
  const [messages, setMessages] = useState([]); // State to track messages
  const [newMessage, setNewMessage] = useState(''); // State to track new message input

  useEffect(() => {
    // Load dummy chats for the selected group
    setMessages(dummyChats[selectedGroup] || []);
  }, [selectedGroup]);

  const handleSendMessage = () => {
    if (newMessage) {
      setMessages([...messages, newMessage]);
      setNewMessage('');
    }
  };

  return (
    <Container title={`Chat - ${selectedGroup}`} scrollable>
      {messages.map((message, index) => (
        <div key={index} className="p-2 border-b">
          {message}
        </div>
      ))}
      <div className="mt-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleSendMessage}
          className="w-full mt-2 p-2 bg-blue-500 text-white rounded"
        >
          Send
        </button>
      </div>
    </Container>
  );
};

export default ChatBox;
