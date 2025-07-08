import React from 'react';
import { Text, View } from 'react-native';

const DevelopmentTips: React.FC = () => (
  <View className="mt-6 rounded-lg border border-blue-100 bg-blue-50 p-4">
    <View className="flex-row items-start">
      <View className="mr-3 mt-0.5 h-4 w-4 rounded-full bg-blue-400 flex items-center justify-center">
        <Text className="text-xs font-bold text-white">i</Text>
      </View>
      <View className="flex-1">
        <Text className="text-sm font-medium text-blue-800 mb-1">Development Tips</Text>
        <Text className="text-xs text-blue-700 leading-relaxed">
          • Make sure your development server is running and accessible{`\n`}
          • Use your computer&apos;s local IP address (not localhost) for device testing{`\n`}
          • Ensure both device and server are on the same network{`\n`}
          • Check firewall settings if connection fails
        </Text>
      </View>
    </View>
  </View>
);

export default DevelopmentTips; 