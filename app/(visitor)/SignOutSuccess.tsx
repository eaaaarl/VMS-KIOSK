import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Linking, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

export default function SignOutSuccess() {
  const { ticketNumber, name } = useLocalSearchParams();
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 justify-center items-center px-8">
        {/* Success Message */}
        <Text className="text-4xl font-bold text-green-500 mb-2 text-center">
          Signed Out Successfully!
        </Text>

        {/* Thank You Message */}
        <Text className="text-lg text-gray-700 mb-12 text-center">
          Thank You!
        </Text>

        {/* User ID */}
        <Text className="text-3xl font-bold text-blue-500 mb-2">
          {ticketNumber}
        </Text>

        {/* User Name */}
        <Text className="text-xl font-semibold text-gray-800 mb-16 text-center">
          {name}
        </Text>

        {/* Action Buttons */}
        <View className="flex-row gap-4 w-full max-w-xs">
          {/* Done Button */}
          <TouchableOpacity
            className="flex-1 bg-blue-500 py-4 px-6 rounded-full shadow-lg"
            onPress={() => router.push('/(main)')}
            activeOpacity={0.8}
          >
            <Text className="text-white text-lg font-semibold text-center">
              Done
            </Text>
          </TouchableOpacity>

          {/* Rate Us Button */}
          <TouchableOpacity
            className="flex-1 bg-yellow-400 py-4 px-6 rounded-full shadow-lg"
            onPress={() => Linking.openURL('https://eaaaarl.vercel.app')}
            activeOpacity={0.8}
          >
            <Text className="text-gray-800 text-lg font-semibold text-center">
              Rate Us
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}