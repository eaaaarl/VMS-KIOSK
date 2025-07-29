import { useUserLoginMutation } from '@/features/user/api/userApi';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import Toast from 'react-native-toast-message';

export function useUserConfirmation() {
  const [userLogin, { isLoading }] = useUserLoginMutation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleConfirm = async () => {
    if (!username || !password) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Please enter both username and password',
        position: 'top',
      });
      return;
    }
    try {
      await userLogin({ username, password });
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Authentication successful',
        position: 'top',
      });
      router.replace('/(main)/SelectScreen');
    } catch (error: any) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'An unexpected error occurred',
        position: 'top',
      });
    }
  };

  return {
    username,
    password,
    isLoading,
    setUsername,
    setPassword,
    handleConfirm,
    handleBack,
  };
}
