// src/hooks/useUser.js
import { useMutation, useQueryClient } from 'react-query';

const useUser = () => {
  const queryClient = useQueryClient();
  
  const setUser = useMutation(
    (userData) => {
      // Simulate a server call to save user data
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(userData);
        }, 1000);
      });
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData('user', data);
      },
    }
  );

  return { setUser };
};

export default useUser;
