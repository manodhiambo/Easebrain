import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { FaPlus, FaArrowLeft, FaSpinner } from 'react-icons/fa'; // Import FaSpinner here
import BackgroundElements from '../components/BackgroundElements'; // Import BackgroundElements component
import AnimatedLogo from '../components/AnimatedLogo'; // Import AnimatedLogo component
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

// Define validation schema using Zod
const schema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  bio: z.string().optional(),
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Email must be a valid email address'),
  phoneNumber: z.string().regex(/^[0-9]{10}$/, 'Phone number must be 10 digits').optional(),
});

// Fetch profile data from the API
const fetchProfile = async () => {
  const { data } = await axios.get('/api/profile');
  return data;
};

// Update profile data via the API
const updateProfile = async (profileData) => {
  const { data } = await axios.put('/api/profile', profileData);
  return data;
};

const EditProfilePage = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Form setup with react-hook-form and Zod resolver
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  // Setup query client for react-query
  const queryClient = useQueryClient();

  // Fetch profile data
  const { data: profileData, isLoading } = useQuery('profile', fetchProfile, {
    onSuccess: (data) => {
      reset(data);  // Reset form with fetched data
    },
  });

  // Setup mutation for updating profile data
  const mutation = useMutation(updateProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries('profile');  // Invalidate query to refetch updated data
    },
    onError: () => {
      // Handle error scenario
    },
  });

  // States for handling profile and cover pictures
  const [profilePicture, setProfilePicture] = React.useState(null);
  const [coverPicture, setCoverPicture] = React.useState(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Handle profile picture drop
  const onDropProfilePicture = (acceptedFiles) => {
    setProfilePicture(URL.createObjectURL(acceptedFiles[0]));
  };

  // Handle cover picture drop
  const onDropCoverPicture = (acceptedFiles) => {
    setCoverPicture(URL.createObjectURL(acceptedFiles[0]));
  };

  // Dropzone setup for profile picture
  const { getRootProps: getProfileRootProps, getInputProps: getProfileInputProps } = useDropzone({
    onDrop: onDropProfilePicture,
    accept: 'image/*',
  });

  // Dropzone setup for cover picture
  const { getRootProps: getCoverRootProps, getInputProps: getCoverInputProps } = useDropzone({
    onDrop: onDropCoverPicture,
    accept: 'image/*',
  });

  // Handle form submission
  const onSubmit = (data) => {
    setIsSubmitting(true);
    mutation.mutate(data, {
      onSettled: () => setIsSubmitting(false), // Reset submitting state
    });
  };

  // Show loading logo or page content
  if (isLoading) return <AnimatedLogo />;

  return (
    <div className="relative flex flex-col items-center min-h-screen p-4">
      {/* Background elements */}
      <BackgroundElements />

      {/* Main content */}
      <div className="relative bg-white bg-opacity-90 p-6 rounded-lg shadow-md w-full max-w-lg z-10 mt-8 transition-transform duration-500 ease-in-out transform hover:scale-105">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate(-1)} // Navigate back to the previous page
            className="text-gray-500 hover:text-gray-700"
          >
            <FaArrowLeft className="text-xl" />
          </button>
          <h1 className="text-2xl font-bold ml-4 text-black">Edit Profile</h1>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="mb-4">
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                {...register('fullName')}
                placeholder="Enter your full name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {errors.fullName && <p className="text-red-500">{errors.fullName.message}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                {...register('username')}
                placeholder="Enter your username"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {errors.username && <p className="text-red-500">{errors.username.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="mb-4">
              <label className="block text-gray-700">Profile Picture</label>
              <div {...getProfileRootProps()} className="w-full h-32 border-dashed border-2 border-gray-300 rounded-md flex items-center justify-center cursor-pointer">
                <input {...getProfileInputProps()} />
                {profilePicture ? (
                  <img src={profilePicture} alt="Profile" className="h-32 object-cover" />
                ) : (
                  <FaPlus className="text-gray-500" />
                )}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Cover Picture</label>
              <div {...getCoverRootProps()} className="w-full h-32 border-dashed border-2 border-gray-300 rounded-md flex items-center justify-center cursor-pointer">
                <input {...getCoverInputProps()} />
                {coverPicture ? (
                  <img src={coverPicture} alt="Cover" className="h-32 object-cover" />
                ) : (
                  <FaPlus className="text-gray-500" />
                )}
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              {...register('email')}
              placeholder="Enter your email address"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="text"
              {...register('phoneNumber')}
              placeholder="Enter your phone number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Bio</label>
            <textarea
              {...register('bio')}
              placeholder="Tell us about yourself"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            ></textarea>
            {errors.bio && <p className="text-red-500">{errors.bio.message}</p>}
          </div>

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => navigate(-1)} // Cancel button to go back
              className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-[#DCB93E] to-[#8FC63F] hover:from-[#8FC63F] hover:to-[#DCB93E] text-white font-bold py-2 px-4 rounded flex items-center"
            >
              {isSubmitting ? (
                <FaSpinner className="animate-spin mr-2" />
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;
