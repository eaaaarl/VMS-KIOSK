import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface SignInDoneButtonProps {
  onPress: () => void;
  isPrinting: boolean;
  className?: string;
  textClassName?: string;
}

export const SignInDoneButton: React.FC<SignInDoneButtonProps> = ({
  onPress,
  isPrinting,
  className = 'bg-blue-500 px-12 py-4 rounded-full shadow-lg',
  textClassName = 'text-white text-lg font-semibold',
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={className}
      activeOpacity={0.8}
      disabled={isPrinting}
    >
      <Text className={textClassName}>{isPrinting ? 'Printing...' : 'Done'}</Text>
    </TouchableOpacity>
  );
};
