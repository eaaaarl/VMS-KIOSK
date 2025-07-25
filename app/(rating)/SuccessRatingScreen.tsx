import { useLazyGetLabelConfigQuery } from '@/features/label/api/labelApi';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SuccessRatingScreen() {
  const handleDone = () => {
    router.replace('/(main)');
  };

  const [getLabelConfig, { data: labelConfig }] = useLazyGetLabelConfigQuery();

  useEffect(() => {
    getLabelConfig();
  }, [getLabelConfig]);

  const message = labelConfig?.find(
    config => config.SectionName === 'Rating' && config.KeyName === 'Exit Message'
  )?.Value;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-8 py-6">
        {/* Header */}
        <View className="mb-8">
          <Text className="text-4xl font-bold text-gray-700">Rate us</Text>
        </View>

        {/* Main Content Container */}
        <View className="flex-1 items-center justify-center px-4">
          {/* Thank You Message */}
          <Text className="mb-12 text-center text-3xl font-medium leading-relaxed text-blue-500">
            {message || 'Thank for your feedback, have a great day!'}
          </Text>

          {/* Done Button */}
          <TouchableOpacity
            onPress={handleDone}
            className="rounded-full bg-blue-500 px-16 py-4 shadow-lg active:bg-blue-600"
            activeOpacity={0.8}
          >
            <Text className="text-2xl font-semibold text-white">Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
