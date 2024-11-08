import React, { useEffect, useState } from 'react';
import { FaPhone } from 'react-icons/fa';
import Layout from '../components/Layout';
import Container from '../components/Container';

const user = {
  name: "Alice Johnson",
  bio: "Dedicated to helping others find peace and balance.",
  avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  activities: "Enjoys yoga, meditation, and reading self-help books.",
  backgroundImage: "https://randomuser.me/api/portraits/women/44.jpg"
};

const avatars = [
  'https://randomuser.me/api/portraits/women/1.jpg',
  'https://randomuser.me/api/portraits/men/2.jpg',
  'https://randomuser.me/api/portraits/women/3.jpg',
];

const CallsPage = () => {
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [recentCalls, setRecentCalls] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const contacts = [
      { id: 1, name: "Emergency Service 1", phone: "123-456-7890", distance: 1.5, time: "Now", avatar: avatars[0] },
      { id: 2, name: "Emergency Service 2", phone: "098-765-4321", distance: 3.0, time: "1 hour ago", avatar: avatars[1] },
      { id: 3, name: "Emergency Service 3", phone: "567-890-1234", distance: 0.5, time: "2 hours ago", avatar: avatars[2] },
      { id: 4, name: "Emergency Service 4", phone: "234-567-8901", distance: 2.0, time: "3 hours ago", avatar: avatars[0] },
      { id: 5, name: "Emergency Service 5", phone: "345-678-9012", distance: 4.5, time: "5 hours ago", avatar: avatars[1] },
      { id: 6, name: "Emergency Service 6", phone: "456-789-0123", distance: 1.2, time: "6 hours ago", avatar: avatars[2] },
      { id: 7, name: "Emergency Service 7", phone: "567-890-1234", distance: 2.3, time: "8 hours ago", avatar: avatars[0] },
      { id: 8, name: "Emergency Service 8", phone: "678-901-2345", distance: 3.5, time: "10 hours ago", avatar: avatars[1] },
      { id: 9, name: "Emergency Service 9", phone: "789-012-3456", distance: 0.9, time: "12 hours ago", avatar: avatars[2] },
      { id: 10, name: "Emergency Service 10", phone: "890-123-4567", distance: 1.1, time: "14 hours ago", avatar: avatars[0] },
    ];

    const sortedContacts = contacts.sort((a, b) => a.distance - b.distance);
    setEmergencyContacts(sortedContacts);

    setRecentCalls([
      { id: 1, name: "John Doe", phone: "234-567-8901", time: "2 hours ago", avatar: avatars[0] },
      { id: 2, name: "Jane Smith", phone: "345-678-9012", time: "Yesterday", avatar: avatars[1] },
      { id: 3, name: "Michael Brown", phone: "456-789-0123", time: "Last week", avatar: avatars[2] },
      { id: 4, name: "Emily Davis", phone: "567-890-1234", time: "2 weeks ago", avatar: avatars[0] },
      { id: 5, name: "David Wilson", phone: "678-901-2345", time: "3 weeks ago", avatar: avatars[1] },
      { id: 6, name: "Sarah Moore", phone: "789-012-3456", time: "1 month ago", avatar: avatars[2] },
      { id: 7, name: "Daniel Taylor", phone: "890-123-4567", time: "2 months ago", avatar: avatars[0] },
      { id: 8, name: "Nancy Anderson", phone: "901-234-5678", time: "3 months ago", avatar: avatars[1] },
      { id: 9, name: "Laura Thomas", phone: "012-345-6789", time: "4 months ago", avatar: avatars[2] },
      { id: 10, name: "James Jackson", phone: "123-456-7890", time: "5 months ago", avatar: avatars[0] },
    ]);
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const leftContent = (
    <div>
      <Container title="Emergency Contacts" scrollable>
        {emergencyContacts.map((contact, index) => (
          <div key={index} onClick={() => handleItemClick(contact)} className="cursor-pointer flex items-center justify-between p-2 rounded hover:bg-blue-50">
            <img src={contact.avatar} alt="Avatar" className="w-12 h-12 rounded-full mr-4" />
            <div>
              <p className="font-semibold">{contact.name}</p>
              <div className="flex items-center">
                <p className="text-gray-700 mr-2">{contact.phone}</p>
                <p className="text-gray-500 text-sm overflow-hidden overflow-ellipsis">{contact.distance} miles away</p>
              </div>
            </div>
          </div>
        ))}
      </Container>

      <Container title="Recent Calls" scrollable>
        {recentCalls.map((call, index) => (
          <div key={index} onClick={() => handleItemClick(call)} className="cursor-pointer flex items-center justify-between p-2 rounded hover:bg-blue-50">
            <img src={call.avatar} alt="Avatar" className="w-12 h-12 rounded-full mr-4" />
            <div>
              <p className="font-semibold">{call.name}</p>
              <div className="flex items-center">
                <p className="text-gray-700 mr-2">{call.phone}</p>
                <p className="text-gray-500 text-sm overflow-hidden overflow-ellipsis">{call.time}</p>
              </div>
            </div>
          </div>
        ))}
      </Container>
    </div>
  );

  const rightContent = (
    <div
      className={`bg-white p-8 rounded-lg shadow-md flex justify-center items-center w-full h-full ${
        selectedItem ? '' : 'max-h-[80vh]'
      }`}
    >
      {selectedItem ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">{selectedItem.name}</h2>
          <p className="text-lg mb-2">Phone: {selectedItem.phone}</p>
          {selectedItem.time && <p className="text-lg mb-2">Time: {selectedItem.time}</p>}
          {selectedItem.distance && <p className="text-lg mb-2">Distance: {selectedItem.distance} miles away</p>}
        </div>
      ) : (
        <FaPhone className="text-6xl text-blue-500 opacity-50" />
      )}
    </div>
  );

  return <Layout user={user} leftContent={leftContent} rightContent={rightContent} />;
};

export default CallsPage;
