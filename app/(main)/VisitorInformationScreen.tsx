import { useConfig } from '@/features/config/hooks/useConfig';
import { useGetVisitorsLogByDayQuery, useGetVisitorsReturnedQuery, useGetVisitorsTodaysQuery } from '@/features/visitors/api/visitorApi';
import { formattedDate } from '@/features/visitors/utils/FormattedDate';
import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function VisitorInformationScreen() {
  const { getIdTotalCount } = useConfig();
  const { data: visitorsReturned } = useGetVisitorsReturnedQuery({ date: formattedDate(new Date()) });
  const countReturned = visitorsReturned?.results?.length || 0;
  const unreturnedPercentageCount = (countReturned / (getIdTotalCount as any)) * 100;

  const { data: visitorsTodays } = useGetVisitorsTodaysQuery({ date: formattedDate(new Date()) });

  const countTodays = visitorsTodays?.results?.filter(vt => !vt.returned?.data?.[0] === true).length || 0;

  const todaysPercentageCount = (countTodays / (getIdTotalCount as any)) * 100;
  const numbersAvailable = (getIdTotalCount as any) - (countReturned + countTodays);
  const availablePercentageCount = (numbersAvailable / (getIdTotalCount as any)) * 100;

  const { data: maxDailyLog } = useGetVisitorsLogByDayQuery();
  const daysToMakeAllNumbersUnavailable = numbersAvailable / (maxDailyLog?.maxDailyLog as any);

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="flex-1">
        <View className="flex-1 justify-center items-center p-4">
          <View className="bg-white rounded-2xl w-full shadow-lg overflow-hidden">
            <View className="bg-red-400 px-4 py-4 flex-row justify-between items-center">
              <Text className="text-white text-xl font-bold tracking-wider">
                NUMBER INFORMATION
              </Text>
              <TouchableOpacity onPress={() => router.push('/(main)')} className="p-1">
                <Text className="text-white text-2xl font-light">×</Text>
              </TouchableOpacity>
            </View>

            <View className="px-4 py-6 bg-gray-50">
              <View className="flex-row flex-wrap items-baseline mb-4">
                <Text className="text-gray-700 text-base">There are </Text>
                <Text className="text-red-500 text-xl font-semibold">{countReturned}</Text>
                <Text className="text-gray-700 text-base"> not signed out/unreturned numbers, </Text>
                <Text className="text-blue-400 text-xl font-semibold">{unreturnedPercentageCount.toFixed(2)}%</Text>
                <Text className="text-gray-700 text-base"> of </Text>
                <Text className="text-blue-500 text-xl font-semibold">{getIdTotalCount}</Text>
                <Text className="text-gray-700 text-base"> total id count.</Text>
              </View>

              <View className="flex-row flex-wrap items-baseline mb-3">
                <Text className="text-blue-500 text-xl font-semibold">{countTodays}</Text>
                <Text className="text-gray-700 text-base"> numbers are used for today, </Text>
                <Text className="text-blue-400 text-xl font-semibold">{todaysPercentageCount.toFixed(2)}%</Text>
                <Text className="text-gray-700 text-base"> of </Text>
                <Text className="text-blue-500 text-xl font-semibold">{getIdTotalCount}</Text>
                <Text className="text-gray-700 text-base"> total id count.</Text>
              </View>

              <View className="flex-row flex-wrap items-baseline mb-6">
                <Text className="text-blue-500 text-xl font-semibold">{numbersAvailable}</Text>
                <Text className="text-gray-700 text-base"> numbers are available, </Text>
                <Text className="text-blue-400 text-xl font-semibold">{availablePercentageCount.toFixed(2)}%</Text>
                <Text className="text-gray-700 text-base"> of </Text>
                <Text className="text-blue-500 text-xl font-semibold">{getIdTotalCount}</Text>
                <Text className="text-gray-700 text-base"> total id count.</Text>
              </View>

              <View className="flex-row flex-wrap items-baseline mb-6">
                <Text className="text-gray-700 text-base">
                  On a daily log basis, base on the log count per day, it will only take approximately{' '}
                </Text>
                <Text className="text-red-500 text-xl font-bold">{daysToMakeAllNumbersUnavailable.toFixed(0)} days</Text>
                <Text className="text-gray-700 text-base"> to make all numbers unavailable.</Text>
              </View>

              <View className="flex-row flex-wrap items-baseline mb-6">
                <Text className="text-gray-700 text-base">Would you like to return all </Text>
                <Text className="text-red-500 text-xl font-semibold">{countReturned}</Text>
                <Text className="text-gray-700 text-base"> not signed out/unreturned numbers?</Text>
              </View>

              <View className="flex-col gap-3">
                <TouchableOpacity
                  onPress={() => router.push('/(main)')}
                  className="bg-blue-500 px-4 py-3 rounded-full w-full"
                >
                  <Text className="text-white text-center font-medium text-base">Ask me next time</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => { }}
                  className="bg-red-400 px-4 py-3 rounded-full w-full"
                >
                  <Text className="text-white text-center font-medium text-base">Return all {countReturned} numbers</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}