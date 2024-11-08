import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { FaArrowLeft, FaTimes } from 'react-icons/fa'; // Import icons
import BackgroundElements from '../components/BackgroundElements'; // Import BackgroundElements

const BecomeTherapistForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    qualifications: '',
    experience: '',
    bio: '',
    avatar: null,
    coverImage: null,
    cv: null // Add CV to formData
  });

  const [comments, setComments] = useState([]);

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="relative bg-gray-100 min-h-screen p-6">
      {/* Background Elements */}
      <BackgroundElements />

      <div className="relative bg-white bg-opacity-80 p-6 rounded-lg shadow-md w-full max-w-lg mx-auto mt-8 z-10">
        {/* Navigation Buttons */}
        <div className="flex items-center mb-6">
          <button 
            onClick={() => navigate(-1)} 
            className="text-gray-600 hover:text-gray-900"
            aria-label="Go Back"
          >
            <FaArrowLeft className="text-2xl" />
          </button>
          <button 
            onClick={() => navigate('/homepage')} 
            className="ml-auto text-gray-600 hover:text-gray-900"
            aria-label="Cancel"
          >
            <FaTimes className="text-2xl" />
          </button>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-black">Become a Therapist</h2>
        <form onSubmit={handleSubmit} className="space-y-6 pb-16">
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Qualifications</label>
            <textarea
              name="qualifications"
              value={formData.qualifications}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Experience</label>
            <textarea
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Avatar</label>
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={handleChange}
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Cover Image</label>
            <input
              type="file"
              name="coverImage"
              accept="image/*"
              onChange={handleChange}
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">CV (PDF only)</label>
            <input
              type="file"
              name="cv"
              accept=".pdf"
              onChange={handleChange}
              className="w-full"
            />
          </div>

          {/* Comments Section */}
          <div className="mb-6">
            <div className="space-y-4">
              {comments.map((comment, index) => (
                <div key={index} className="p-4 bg-white bg-opacity-50 rounded-md border border-gray-200">
                  <strong className="text-gray-800">{comment.name}</strong>
                  <p className="text-gray-600">{comment.message}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons Positioned in Form Container */}
          <div className="flex justify-between">
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 text-white rounded-md"
            >
              Submit
            </button>
            <button 
              onClick={() => navigate('/homepage')} 
              type="button"
              className="px-4 py-2 bg-gray-300 text-black rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BecomeTherapistForm;
