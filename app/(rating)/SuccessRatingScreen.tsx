import { router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SuccessRatingScreen() {
  const handleDone = () => {
    router.replace('/(main)');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-8 py-6">
        {/* Header */}
        <View className="mb-8">
          <Text className="text-4xl font-bold text-gray-700">
            Rate us
          </Text>
        </View>

        {/* Main Content Container */}
        <View className="flex-1 justify-center items-center px-4">
          {/* Thank You Message */}
          <Text className="text-blue-500 text-3xl font-medium text-center leading-relaxed mb-12">
            Thank for your feedback, have a great day!
          </Text>

          {/* Done Button */}
          <TouchableOpacity
            onPress={handleDone}
            className="bg-blue-500 rounded-full px-16 py-4 shadow-lg active:bg-blue-600"
            activeOpacity={0.8}
          >
            <Text className="text-white text-2xl font-semibold">
              Done
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}