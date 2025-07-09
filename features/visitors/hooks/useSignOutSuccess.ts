import { router, useLocalSearchParams } from 'expo-router';
import { Linking } from 'react-native';

export const useSignOutSuccess = () => {
  const { ticketNumber, name } = useLocalSearchParams();

  const handleDone = () => {
    router.push('/(main)');
  };

  const handleRateUs = () => {
    Linking.openURL('https://eaaaarl.vercel.app');
  };

  return {
    ticketNumber: ticketNumber as string,
    name: name as string,
    handleDone,
    handleRateUs,
  };
}; 