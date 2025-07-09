import React from 'react';
import { Text } from 'react-native';

interface TicketNumberDisplayProps {
  ticketNumber: string;
  className?: string;
}

export const TicketNumberDisplay: React.FC<TicketNumberDisplayProps> = ({ 
  ticketNumber, 
  className = "text-6xl font-bold text-blue-500 text-center mb-6" 
}) => {
  return (
    <Text className={className}>
      {ticketNumber}
    </Text>
  );
}; 