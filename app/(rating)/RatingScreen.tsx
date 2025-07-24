import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Rating() {
  const { ticketNumber, name, logIn, visitorId } = useLocalSearchParams();

  console.log('ticketNumber', ticketNumber);
  console.log('name', name);
  console.log('logIn', logIn);

  const handleOfficeRating = () => {
    router.push({
      pathname: '/(rating)/OfficeRatingScreen',
      params: {
        ticketNumber,
        name,
        logIn,
        visitorId,
      },
    });
  };

  const handleDepartmentRating = () => {
    router.push({
      pathname: '/(rating)/DepartmentRatingScreen',
      params: {
        ticketNumber,
        name,
        logIn,
        visitorId,
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 px-8 py-12">
        {/* Header Section */}
        <View className="items-center mb-16">
          <Text className="text-4xl font-bold text-gray-700 mb-4">
            Rate us
          </Text>

          <View className="items-center">
            <Text className="text-2xl font-semibold mb-2">
              Hi <Text className="text-blue-500 font-bold">{name}</Text>! we need your feedback
            </Text>
            <Text className="text-lg text-gray-600 text-center">
              Please rate your experience in this visit
            </Text>
          </View>
        </View>

        {/* Rating Buttons Section */}
        <View className="flex-1 justify-center items-center gap-8">
          {/* Office Level Rating Button */}
          <TouchableOpacity
            onPress={handleOfficeRating}
            className="w-full max-w-md bg-blue-500 rounded-2xl py-6 px-8 shadow-lg active:bg-blue-600"
            activeOpacity={0.8}
          >
            <Text className="text-white text-xl font-semibold text-center">
              Office Level Rating
            </Text>
          </TouchableOpacity>

          {/* Office to Department Level Rating Button */}
          <TouchableOpacity
            onPress={handleDepartmentRating}
            className="w-full max-w-md bg-blue-500 rounded-2xl py-6 px-8 shadow-lg active:bg-blue-600"
            activeOpacity={0.8}
          >
            <Text className="text-white text-xl font-semibold text-center leading-7">
              Office to Department Level{'\n'}Rating
            </Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Spacer */}
        <View className="h-16" />
      </View>
    </SafeAreaView>
  );
}