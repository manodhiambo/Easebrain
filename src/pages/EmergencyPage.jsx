import React, { useState, useEffect } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa'; // Importing emergency icon
import Layout from '../components/Layout';
import Container from '../components/Container';

const avatars = [
  'https://randomuser.me/api/portraits/women/1.jpg',
  'https://randomuser.me/api/portraits/men/2.jpg',
  'https://randomuser.me/api/portraits/women/3.jpg',
];

const EmergencyPage = () => {
  const [missedCalls, setMissedCalls] = useState([]);
  const [unansweredMessages, setUnansweredMessages] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    // Simulating data fetching
    const fetchEmergencyData = () => {
      // Fetch missed calls (simulated data)
      const missed = [
        { id: 1, name: "John Doe", phone: "234-567-8901", time: "2 hours ago", avatar: avatars[0] },
        { id: 2, name: "Jane Smith", phone: "345-678-9012", time: "Yesterday", avatar: avatars[1] },
        { id: 3, name: "Michael Brown", phone: "456-789-0123", time: "Last week", avatar: avatars[2] },
      ];
      setMissedCalls(missed);

      // Fetch unanswered messages (simulated data)
      const unanswered = [
        { id: 1, name: "Emily Davis", phone: "567-890-1234", time: "2 weeks ago", avatar: avatars[0] },
        { id: 2, name: "David Wilson", phone: "678-901-2345", time: "3 weeks ago", avatar: avatars[1] },
        { id: 3, name: "Sarah Moore", phone: "789-012-3456", time: "1 month ago", avatar: avatars[2] },
      ];
      setUnansweredMessages(unanswered);
    };

    fetchEmergencyData();
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const leftContent = (
    <div>
      <Container title="Missed Calls" scrollable>
        {missedCalls.map((call, index) => (
          <div
            key={index}
            onClick={() => handleItemClick(call)}
            className={`cursor-pointer flex items-center justify-between p-2 rounded ${selectedItem === call ? 'bg-blue-50' : 'hover:bg-blue-50'}`}
          >
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

      <Container title="Unanswered Messages" scrollable>
        {unansweredMessages.map((message, index) => (
          <div
            key={index}
            onClick={() => handleItemClick(message)}
            className={`cursor-pointer flex items-center justify-between p-2 rounded ${selectedItem === message ? 'bg-blue-50' : 'hover:bg-blue-50'}`}
          >
            <img src={message.avatar} alt="Avatar" className="w-12 h-12 rounded-full mr-4" />
            <div>
              <p className="font-semibold">{message.name}</p>
              <div className="flex items-center">
                <p className="text-gray-700 mr-2">{message.phone}</p>
                <p className="text-gray-500 text-sm overflow-hidden overflow-ellipsis">{message.time}</p>
              </div>
            </div>
          </div>
        ))}
      </Container>
    </div>
  );

  const rightContent = (
    <div className={`bg-white p-8 rounded-lg shadow-md flex justify-center items-center w-full ${selectedItem ? 'h-full' : 'h-4/5'}`}>
      {selectedItem ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">{selectedItem.name}</h2>
          <p className="text-lg mb-2">Phone: {selectedItem.phone}</p>
          {selectedItem.time && <p className="text-lg mb-2">Time: {selectedItem.time}</p>}
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg mt-4"
            onClick={() => console.log("Responding to emergency:", selectedItem)}
          >
            <FaExclamationTriangle className="inline-block mr-2" />
            Respond to Emergency
          </button>
        </div>
      ) : (
        <FaExclamationTriangle className="text-6xl text-red-500 opacity-50" />
      )}
    </div>
  );

  return <Layout leftContent={leftContent} rightContent={rightContent} />;
};

export default EmergencyPage;
