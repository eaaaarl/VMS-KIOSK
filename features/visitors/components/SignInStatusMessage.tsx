import React from 'react';
import { Text } from 'react-native';

interface SignInStatusMessageProps {
  message: string | undefined;
  color: string;
  className?: string;
}

export const SignInStatusMessage: React.FC<SignInStatusMessageProps> = ({
  message,
  color,
  className = 'text-lg text-center mb-12',
}) => {
  return <Text className={`${className} ${color}`}>{message || 'Please claim your ticket!'}</Text>;
};
