import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import easebrainlogo from '../../assets/easebrainlogo.png';

const LoginContent = ({ onSuccess }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data) => {
    setIsLoading(true);
    // Simulate an API call for login
    setTimeout(() => {
      setIsLoading(false);
      onSuccess(); // Callback after successful login
      navigate('/Homepage'); // Navigate to the homepage or any other page
    }, 2000);
  };

  return (
    <div className="p-6">
      <img src={easebrainlogo} alt="EaseBrain Logo" className="mx-auto mb-6 w-40" />
      <h1 className="text-2xl font-bold mb-6 text-black text-center">Login to EaseBrain</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            {...register('email', { required: 'Email is required' })}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-white ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && <p className="text-red-500 mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            {...register('password', { required: 'Password is required' })}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-white ${errors.password ? 'border-red-500' : ''}`}
          />
          {errors.password && <p className="text-red-500 mt-1">{errors.password.message}</p>}
        </div>
        <button
          type="submit"
          className={`w-full px-4 py-2 bg-gradient-to-r from-[#DCB93E] to-[#8FC63F] text-white rounded-md transition duration-300 ${isLoading ? 'cursor-not-allowed opacity-50' : 'hover:from-[#8FC63F] hover:to-[#DCB93E]'}`}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Login'}
        </button>
        <button
          type="button"
          className="w-full px-4 py-2 mt-4 bg-black text-white rounded-md transition duration-300 hover:bg-gray-800"
          onClick={() => alert('Google Sign-In functionality not implemented yet.')}
        >
          Sign in with Google
        </button>
      </form>
    </div>
  );
};

export default LoginContent;
