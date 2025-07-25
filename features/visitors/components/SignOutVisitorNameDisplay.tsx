import React from 'react';
import { Text } from 'react-native';

interface SignOutVisitorNameDisplayProps {
  name: string;
  className?: string;
}

export const SignOutVisitorNameDisplay: React.FC<SignOutVisitorNameDisplayProps> = ({
  name,
  className = 'text-xl font-semibold text-gray-800 mb-16 text-center',
}) => {
  return <Text className={className}>{name}</Text>;
};
