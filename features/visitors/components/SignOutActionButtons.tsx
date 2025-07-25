import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface SignOutActionButtonsProps {
  onDone: () => void;
  onRateUs: () => void;
  className?: string;
}

export const SignOutActionButtons: React.FC<SignOutActionButtonsProps> = ({
  onDone,
  onRateUs,
  className = 'flex-row gap-4 w-full max-w-xs',
}) => {
  return (
    <View className={className}>
      {/* Done Button */}
      <TouchableOpacity
        className="flex-1 rounded-full bg-blue-500 px-6 py-4 shadow-lg"
        onPress={onDone}
        activeOpacity={0.8}
      >
        <Text className="text-center text-lg font-semibold text-white">Done</Text>
      </TouchableOpacity>

      {/* Rate Us Button */}
      <TouchableOpacity
        className="flex-1 rounded-full bg-yellow-400 px-6 py-4 shadow-lg"
        onPress={onRateUs}
        activeOpacity={0.8}
      >
        <Text className="text-center text-lg font-semibold text-gray-800">Rate Us</Text>
      </TouchableOpacity>
    </View>
  );
};
