import React from 'react';
import { Text } from 'react-native';

interface SignOutThankYouMessageProps {
  className?: string;
  message: string | undefined;
}

export const SignOutThankYouMessage: React.FC<SignOutThankYouMessageProps> = ({
  className = 'text-lg text-gray-700 mb-12 text-center',
  message,
}) => {
  return <Text className={className}>{message || 'Thank You!'}</Text>;
};
