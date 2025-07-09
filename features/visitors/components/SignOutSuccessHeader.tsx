import React from 'react';
import { Text } from 'react-native';

interface SignOutSuccessHeaderProps {
  className?: string;
}

export const SignOutSuccessHeader: React.FC<SignOutSuccessHeaderProps> = ({ 
  className = "text-4xl font-bold text-green-500 mb-2 text-center" 
}) => {
  return (
    <Text className={className}>
      Signed Out Successfully!
    </Text>
  );
}; 