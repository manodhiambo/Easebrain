import React, { useState, useCallback } from 'react';
import Layout from '../components/Layout';
import GroupList from '../components/ForumPage/GroupList';
import ChatHeader from '../components/ForumPage/ChatHeader';
import ChatMessages from '../components/ForumPage/ChatMessages';
import MessageInput from '../components/ForumPage/MessageInput';
import DeleteModal from '../components/DeleteModal';
import Modal from 'react-modal';

// Ensure the modal root element is set
Modal.setAppElement('#root');

const ForumPage = () => {
  const [groups, setGroups] = useState([
    { id: 1, name: 'Default Group', avatar: 'https://randomuser.me/api/portraits/men/1.jpg', tagline: 'Listen and Speak to the world' },
    { id: 2, name: 'Group 2', avatar: 'https://randomuser.me/api/portraits/women/2.jpg', tagline: 'A place for thoughtful discussion' },
    { id: 3, name: 'Group 3', avatar: 'https://randomuser.me/api/portraits/men/3.jpg', tagline: 'Connect and collaborate' },
    { id: 4, name: 'Group 4', avatar: 'https://randomuser.me/api/portraits/women/4.jpg', tagline: 'Share your thoughts' },
    { id: 5, name: 'Group 5', avatar: 'https://randomuser.me/api/portraits/men/5.jpg', tagline: 'Engage with peers' },
    { id: 6, name: 'Group 6', avatar: 'https://randomuser.me/api/portraits/women/6.jpg', tagline: 'Discuss and learn' },
    { id: 7, name: 'Group 7', avatar: 'https://randomuser.me/api/portraits/men/7.jpg', tagline: 'Innovate and inspire' },
  ]);

  const [selectedGroup, setSelectedGroup] = useState(groups[0]);
  const [newGroupName, setNewGroupName] = useState('');
  const [showGroupForm, setShowGroupForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAllGroups, setShowAllGroups] = useState(false);
  const [chatSearchTerm, setChatSearchTerm] = useState('');
  const [chats, setChats] = useState([
    { groupId: 1, user: 'User1', message: 'Hello from Default Group!', isOwner: true },
    { groupId: 1, user: 'User2', message: 'Hi there!', isOwner: false },
    { groupId: 2, user: 'User3', message: 'Welcome to Group 2!', isOwner: false },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [previewFiles, setPreviewFiles] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const handleGroupSelect = useCallback((group) => {
    setSelectedGroup(group);
  }, []);

  const handleNewGroup = useCallback(() => {
    if (newGroupName.trim()) {
      const newGroup = { id: groups.length + 1, name: newGroupName, avatar: 'https://randomuser.me/api/portraits/lego/1.jpg', tagline: 'New group tagline' };
      setGroups(prevGroups => [...prevGroups, newGroup]);
      setNewGroupName('');
      setShowGroupForm(false);
    }
  }, [newGroupName, groups]);

  const handleNewMessage = useCallback(() => {
    if (newMessage.trim() || previewFiles.length > 0) {
      const newChat = { 
        groupId: selectedGroup.id, 
        user: 'CurrentUser', 
        message: newMessage, 
        isOwner: true,
        files: previewFiles
      };
      setChats(prevChats => [...prevChats, newChat]);
      setNewMessage('');
      setPreviewFiles([]);
    }
  }, [newMessage, selectedGroup.id, previewFiles]);

  const handleFileChange = (files) => {
    const fileURLs = files.map(file => URL.createObjectURL(file));
    setPreviewFiles(fileURLs);
  };

  const handleRemoveFile = (index) => {
    setPreviewFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const handleComment = useCallback((message) => {
    // Handle comment action
  }, []);

  const handleReply = useCallback((message) => {
    // Handle reply action
  }, []);

  const handleShare = useCallback((message) => {
    // Handle share action
  }, []);

  const handleDelete = useCallback((message) => {
    setChats(prevChats => prevChats.filter(chat => chat.message !== message));
  }, []);

  const openDeleteModal = useCallback((groupId) => {
    setDeleteTargetId(groupId);
    setIsDeleteModalOpen(true);
  }, []);

  const handleDeleteGroup = useCallback(() => {
    if (deleteTargetId !== null) {
      setGroups(prevGroups => prevGroups.filter(group => group.id !== deleteTargetId));
      setIsDeleteModalOpen(false);
      setDeleteTargetId(null);
    }
  }, [deleteTargetId]);

  const filteredChats = chats.filter(chat =>
    chat.groupId === selectedGroup.id && chat.message.toLowerCase().includes(chatSearchTerm.toLowerCase())
  );

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupsToDisplay = showAllGroups ? filteredGroups : filteredGroups.slice(0, 5);

  return (
    <>
      <Layout
        leftContent={(
          <GroupList
            groups={groups}
            selectedGroup={selectedGroup}
            onGroupSelect={handleGroupSelect}
            newGroupName={newGroupName}
            onNewGroupNameChange={setNewGroupName}
            showGroupForm={showGroupForm}
            onToggleGroupForm={() => setShowGroupForm(prev => !prev)}
            onCreateGroup={handleNewGroup}
            searchTerm={searchTerm}
            onSearchTermChange={setSearchTerm}
            showAllGroups={showAllGroups}
            onToggleShowAllGroups={() => setShowAllGroups(prev => !prev)}
            filteredGroups={filteredGroups}
            onDeleteGroup={openDeleteModal}
          />
        )}
        rightContent={(
          <div className="p-0 w-full max-w-full flex flex-col h-screen">
            <ChatHeader
              group={selectedGroup}
              chatSearchTerm={chatSearchTerm}
              onChatSearchTermChange={setChatSearchTerm}
            />
            <ChatMessages
              chats={filteredChats}
              onComment={handleComment}
              onReply={handleReply}
              onShare={handleShare}
              onDelete={handleDelete}
            />
            <MessageInput
              newMessage={newMessage}
              onNewMessageChange={setNewMessage}
              onSendMessage={handleNewMessage}
              onFileChange={handleFileChange}
              previewFiles={previewFiles}
              onRemoveFile={handleRemoveFile}
            />
          </div>
        )}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDeleteGroup}
        deleteTarget="group"
      />
      <Modal
        isOpen={isUploadModalOpen}
        onRequestClose={() => setIsUploadModalOpen(false)}
        contentLabel="Upload Status"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Upload Status</h2>
        <p>Upload completed.</p>
        <button onClick={() => setIsUploadModalOpen(false)}>Close</button>
      </Modal>
    </>
  );
};

export default ForumPage;
