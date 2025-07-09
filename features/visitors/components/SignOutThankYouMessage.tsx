import React from 'react';
import { Text } from 'react-native';

interface SignOutThankYouMessageProps {
  className?: string;
}

export const SignOutThankYouMessage: React.FC<SignOutThankYouMessageProps> = ({ 
  className = "text-lg text-gray-700 mb-12 text-center" 
}) => {
  return (
    <Text className={className}>
      Thank You!
    </Text>
  );
}; 