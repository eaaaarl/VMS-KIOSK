import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const LoadingOverlay: React.FC = () => {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-gray-50">
      <Text className="text-xl text-gray-600">Loading questions...</Text>
    </SafeAreaView>
  );
}; 