import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface DebugInfoProps {
  debugInfo: string;
  onClear: () => void;
}

export const DebugInfo: React.FC<DebugInfoProps> = ({ debugInfo, onClear }) => (
  <View className="rounded-lg bg-white p-4 shadow-sm">
    <View className="mb-3 flex-row items-center justify-between">
      <Text className="text-lg font-semibold">Debug Information</Text>
      <TouchableOpacity onPress={onClear}>
        <Text className="text-sm font-semibold text-blue-500">Clear</Text>
      </TouchableOpacity>
    </View>
    <View className="min-h-32 rounded-lg bg-gray-50 p-3">
      <Text className="font-mono text-xs text-gray-700">
        {debugInfo || 'No debug information yet...'}
      </Text>
    </View>
  </View>
);
