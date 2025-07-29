import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface DebugInfoProps {
  debugInfo: string;
  onClear: () => void;
}

export const DebugInfo: React.FC<DebugInfoProps> = ({ debugInfo, onClear }) => (
  <View className="rounded-lg bg-white p-6 shadow-sm">
    <View className="mb-4 flex-row items-center justify-between">
      <Text className="text-xl font-semibold text-gray-800">Debug Information</Text>
      <TouchableOpacity onPress={onClear} className="rounded-lg bg-blue-500 px-4 py-2">
        <Text className="text-base font-semibold text-white">Clear</Text>
      </TouchableOpacity>
    </View>
    <View className="min-h-40 rounded-lg bg-gray-50 p-4">
      <Text className="font-mono text-sm text-gray-700">
        {debugInfo || 'No debug information yet...'}
      </Text>
    </View>
  </View>
);
