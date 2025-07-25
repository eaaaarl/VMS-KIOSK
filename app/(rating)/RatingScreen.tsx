import { useLazyGetLabelConfigQuery } from '@/features/label/api/labelApi';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Rating() {
  const { ticketNumber, name, logIn, visitorId } = useLocalSearchParams();

  const [getLabelConfig, { data: labelConfig }] = useLazyGetLabelConfigQuery();

  useEffect(() => {
    getLabelConfig();
  }, [getLabelConfig]);

  const message = labelConfig?.find(
    config => config.SectionName === 'Rating' && config.KeyName === 'Welcome Subtitle'
  )?.Value;

  const messageFeedback = labelConfig?.find(
    config => config.SectionName === 'Rating' && config.KeyName === 'Welcome Title'
  )?.Value;

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
        <View className="mb-16 items-center">
          <Text className="mb-4 text-4xl font-bold text-gray-700">Rate us</Text>

          <View className="items-center">
            <Text className="mb-2 text-2xl font-semibold">
              Hi <Text className="font-bold text-blue-500">{name}</Text>!{' '}
              {messageFeedback || 'we need your feedback'}
            </Text>
            <Text className="text-center text-lg text-gray-600">
              {message || 'Please rate your experience in this visit'}
            </Text>
          </View>
        </View>

        {/* Rating Buttons Section */}
        <View className="flex-1 items-center justify-center gap-8">
          {/* Office Level Rating Button */}
          <TouchableOpacity
            onPress={handleOfficeRating}
            className="w-full max-w-md rounded-2xl bg-blue-500 px-8 py-6 shadow-lg active:bg-blue-600"
            activeOpacity={0.8}
          >
            <Text className="text-center text-xl font-semibold text-white">
              Office Level Rating
            </Text>
          </TouchableOpacity>

          {/* Office to Department Level Rating Button */}
          <TouchableOpacity
            onPress={handleDepartmentRating}
            className="w-full max-w-md rounded-2xl bg-blue-500 px-8 py-6 shadow-lg active:bg-blue-600"
            activeOpacity={0.8}
          >
            <Text className="text-center text-xl font-semibold leading-7 text-white">
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
