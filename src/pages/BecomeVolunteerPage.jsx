// src/pages/BecomeVolunteerPage.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FaAmbulance, FaHandsHelping, FaHeartbeat, FaHospital, FaMedkit, FaProcedures, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import BackgroundElements from '../components/BackgroundElements';

// Define the validation schema using Zod
const validationSchema = z.object({
  name: z.string().nonempty({ message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email format' }).nonempty({ message: 'Email is required' }),
  phone: z.string().nonempty({ message: 'Phone number is required' }),
  address: z.string().nonempty({ message: 'Address is required' }),
  experience: z.string().nonempty({ message: 'Experience is required' }),
  cv: z.any().refine(file => file.length > 0, { message: 'CV is required' }),
});

const BecomeVolunteerPage = () => {
  // Use React Hook Form with Zod resolver
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(validationSchema)
  });

  const navigate = useNavigate();

  // Handle form submission
  const onSubmit = (data) => {
    console.log('Form Data:', data);
    // Handle form submission logic here
  };

  // Handle cancel button click
  const handleCancel = () => {
    reset(); // Reset the form
    navigate('/homepage'); // Optionally, navigate to a different page
  };

  // Define services with icons and names
  const services = [
    { icon: FaAmbulance, name: 'Transport' },
    { icon: FaHandsHelping, name: 'Community Support' },
    { icon: FaHeartbeat, name: 'Health Monitoring' },
    { icon: FaHospital, name: 'Hospital Assistance' },
    { icon: FaMedkit, name: 'Medical Supplies' },
    { icon: FaProcedures, name: 'Trauma Response' },
  ];

  return (
    <div className="relative min-h-screen">
      <BackgroundElements />
      <div className="relative bg-transparent p-8 rounded-lg shadow-md w-full max-w-xl mx-auto mt-8">
        <button onClick={() => navigate(-1)} className="text-gray-700 mb-4">
          <FaArrowLeft size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center text-black">Become a Volunteer</h2>
        <p className="mb-6 text-gray-700 text-center">Join our team of dedicated volunteers and contribute to our emergency response services. We offer a range of services from transport to trauma response.</p>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Display services */}
            {services.map((service, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-gray-100 rounded-md">
                <service.icon className="text-primary w-6 h-6" />
                <span className="text-gray-800 font-semibold">{service.name}</span>
              </div>
            ))}
          </div>

          {/* Form fields with validation */}
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              {...register('name')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              {...register('email')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phone"
              {...register('phone')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              {...register('address')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700">Experience</label>
            <textarea
              name="experience"
              {...register('experience')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.experience && <p className="text-red-500 text-sm">{errors.experience.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700">Upload CV</label>
            <input
              type="file"
              name="cv"
              {...register('cv')}
              className="w-full"
            />
            {errors.cv && <p className="text-red-500 text-sm">{errors.cv.message}</p>}
          </div>

          {/* Form buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BecomeVolunteerPage;
