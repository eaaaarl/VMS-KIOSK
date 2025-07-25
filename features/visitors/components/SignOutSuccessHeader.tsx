import React from 'react';
import { Text } from 'react-native';

interface SignOutSuccessHeaderProps {
  className?: string;
  message: string | undefined;
}

export const SignOutSuccessHeader: React.FC<SignOutSuccessHeaderProps> = ({
  className = 'text-4xl font-bold text-green-500 mb-2 text-center',
  message,
}) => {
  return <Text className={className}>{message || 'Signed Out Successfully!'}</Text>;
};
