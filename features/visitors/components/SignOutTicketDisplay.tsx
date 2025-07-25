import React from 'react';
import { Text } from 'react-native';

interface SignOutTicketDisplayProps {
  ticketNumber: string;
  className?: string;
}

export const SignOutTicketDisplay: React.FC<SignOutTicketDisplayProps> = ({
  ticketNumber,
  className = 'text-3xl font-bold text-blue-500 mb-2',
}) => {
  return <Text className={className}>{ticketNumber}</Text>;
};
