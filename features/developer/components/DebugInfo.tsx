import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

interface DebugInfoProps {
  debugInfo: string
  onClear: () => void
}

export const DebugInfo: React.FC<DebugInfoProps> = ({ debugInfo, onClear }) => (
  <View className="bg-white rounded-lg p-4 shadow-sm">
    <View className="flex-row justify-between items-center mb-3">
      <Text className="text-lg font-semibold">Debug Information</Text>
      <TouchableOpacity onPress={onClear}>
        <Text className="text-blue-500 text-sm font-semibold">Clear</Text>
      </TouchableOpacity>
    </View>
    <View className="bg-gray-50 p-3 rounded-lg min-h-32">
      <Text className="text-xs font-mono text-gray-700">
        {debugInfo || 'No debug information yet...'}
      </Text>
    </View>
  </View>
) 