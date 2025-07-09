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
  className = "flex-row gap-4 w-full max-w-xs" 
}) => {
  return (
    <View className={className}>
      {/* Done Button */}
      <TouchableOpacity
        className="flex-1 bg-blue-500 py-4 px-6 rounded-full shadow-lg"
        onPress={onDone}
        activeOpacity={0.8}
      >
        <Text className="text-white text-lg font-semibold text-center">
          Done
        </Text>
      </TouchableOpacity>

      {/* Rate Us Button */}
      <TouchableOpacity
        className="flex-1 bg-yellow-400 py-4 px-6 rounded-full shadow-lg"
        onPress={onRateUs}
        activeOpacity={0.8}
      >
        <Text className="text-gray-800 text-lg font-semibold text-center">
          Rate Us
        </Text>
      </TouchableOpacity>
    </View>
  );
}; 