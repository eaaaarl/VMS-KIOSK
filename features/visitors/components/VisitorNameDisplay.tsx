import React from 'react';
import { Text } from 'react-native';

interface VisitorNameDisplayProps {
  visitorName: string;
  className?: string;
}

export const VisitorNameDisplay: React.FC<VisitorNameDisplayProps> = ({ 
  visitorName, 
  className = "text-xl font-semibold text-gray-700 text-center mb-16" 
}) => {
  return (
    <Text className={className}>
      {visitorName}
    </Text>
  );
}; 