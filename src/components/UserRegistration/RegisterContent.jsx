import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import easebrainlogo from '../../assets/easebrainlogo.png';

// Validation schema
const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

// Mock API call to register the user
const registerUser = async (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 2000);
  });
};

const RegisterContent = ({ onSuccess }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await registerUser(data);
      onSuccess();
      navigate('/Homepage');
    } catch (error) {
      console.error("Registration failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    alert('Google Sign-Up functionality not implemented yet.');
  };

  return (
    <div className="p-6">
      <Link to="/">
        <img src={easebrainlogo} alt="EaseBrain Logo" className="mx-auto mb-6 w-40" />
      </Link>
      <h1 className="text-2xl font-bold mb-6 text-black text-center">Register at EaseBrain</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            {...register('name')}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-white bg-opacity-50 ${errors.name ? 'border-red-500' : ''}`}
          />
          {errors.name && <p className="text-red-500 mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            {...register('email')}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-white bg-opacity-50 ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && <p className="text-red-500 mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            {...register('password')}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-white bg-opacity-50 ${errors.password ? 'border-red-500' : ''}`}
          />
          {errors.password && <p className="text-red-500 mt-1">{errors.password.message}</p>}
        </div>
        <button
          type="submit"
          className={`w-full px-4 py-2 bg-gradient-to-r from-[#DCB93E] to-[#8FC63F] text-white rounded-md transition duration-300 ${isLoading ? 'cursor-not-allowed opacity-50' : 'hover:from-[#8FC63F] hover:to-[#DCB93E]'}`}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Register'}
        </button>
      </form>
      <button
        className="w-full px-4 py-2 mt-4 bg-black text-white rounded-md transition duration-300 hover:bg-gray-800"
        onClick={handleGoogleSignup}
      >
        Sign up with Google
      </button>
    </div>
  );
};

export default RegisterContent;
