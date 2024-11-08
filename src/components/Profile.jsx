import React from 'react';

const Profile = ({ user }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 relative">
      <div className="relative">
        <div className="w-full h-32 rounded-t-lg overflow-hidden">
          <img
            src={user.backgroundImage}
            alt="User background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex justify-center -mt-16 md:-mt-24"> {/* Adjust -mt-16 for smaller screens */}
          <img
            src={user.avatar}
            alt="User avatar"
            className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white"
          />
        </div>
      </div>
      <div className="text-center mt-4">
        <h2 className="text-xl font-bold">{user.name}</h2>
        <p className="text-gray-700">{user.bio}</p>
      </div>
      <hr className=" border-gray-300" /> {/* Line separator */}
      <div className="text-center mt-2">
        <h3 className="text-lg font-semibold">Activities</h3>
        <p className="text-gray-700">{user.activities}</p>
      </div>
    </div>
  );
};

export default Profile;
