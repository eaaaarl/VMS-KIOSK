import React from 'react';
import { Text } from 'react-native';

interface SignInSuccessHeaderProps {
  className?: string;
}

export const SignInSuccessHeader: React.FC<SignInSuccessHeaderProps> = ({ 
  className = "text-4xl font-bold text-green-500 text-center mb-6" 
}) => {
  return (
    <Text className={className}>
      Signed In Successfully!
    </Text>
  );
}; 