import React from 'react';
import { Text, View } from 'react-native';

interface DevelopmentTipsProps {
  isTablet?: boolean;
}

const DevelopmentTips: React.FC<DevelopmentTipsProps> = ({ isTablet = false }) => (
  <View className={`rounded-lg border  border-blue-100 bg-blue-50 ${isTablet ? 'p-6' : 'p-4'}`}>
    <View className="flex-row items-start">
      <View className={`mr-3 mt-0.5 flex items-center justify-center rounded-full bg-blue-400 ${isTablet ? 'h-5 w-5' : 'h-4 w-4'}`}>
        <Text className={`font-bold text-white ${isTablet ? 'text-sm' : 'text-xs'}`}>i</Text>
      </View>
      <View className="flex-1">
        <Text className={`mb-1 font-medium text-blue-800 ${isTablet ? 'text-base' : 'text-sm'}`}>Development Tips</Text>
        <Text className={`leading-relaxed text-blue-700 ${isTablet ? 'text-sm' : 'text-xs'}`}>
          • Make sure your development server is running and accessible{`\n`}• Use your
          computer&apos;s local IP address (not localhost) for device testing{`\n`}• Ensure both
          device and server are on the same network{`\n`}• Check firewall settings if connection
          fails
        </Text>
      </View>
    </View>
  </View>
);

export default DevelopmentTips;
