import React from 'react';
import { Text } from 'react-native';

interface SignInSuccessHeaderProps {
  className?: string;
  message: string | undefined;
}

export const SignInSuccessHeader: React.FC<SignInSuccessHeaderProps> = ({
  className = 'text-4xl font-bold text-green-500 text-center mb-6',
  message,
}) => {
  return <Text className={className}>{message || 'Signed In Successfully!'}</Text>;
};
