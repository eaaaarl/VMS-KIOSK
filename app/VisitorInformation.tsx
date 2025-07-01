import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function VisitorInformation() {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="flex-1">
        <View className="flex-1 justify-center items-center p-4">
          <View className="bg-white rounded-2xl w-full shadow-lg overflow-hidden">
            <View className="bg-red-400 px-4 py-4 flex-row justify-between items-center">
              <Text className="text-white text-xl font-bold tracking-wider">
                NUMBER INFORMATION
              </Text>
              <TouchableOpacity onPress={() => router.push('/')} className="p-1">
                <Text className="text-white text-2xl font-light">×</Text>
              </TouchableOpacity>
            </View>

            <View className="px-4 py-6 bg-gray-50">
              <View className="flex-row flex-wrap items-baseline mb-4">
                <Text className="text-gray-700 text-base">There are </Text>
                <Text className="text-red-500 text-xl font-semibold">1</Text>
                <Text className="text-gray-700 text-base"> not signed out/unreturned numbers, </Text>
                <Text className="text-blue-400 text-xl font-semibold">0.25%</Text>
                <Text className="text-gray-700 text-base"> of </Text>
                <Text className="text-blue-500 text-xl font-semibold">400</Text>
                <Text className="text-gray-700 text-base"> total id count.</Text>
              </View>

              <View className="flex-row flex-wrap items-baseline mb-3">
                <Text className="text-blue-500 text-xl font-semibold">2</Text>
                <Text className="text-gray-700 text-base"> numbers are used for today, </Text>
                <Text className="text-blue-400 text-xl font-semibold">0.50%</Text>
                <Text className="text-gray-700 text-base"> of </Text>
                <Text className="text-blue-500 text-xl font-semibold">400</Text>
                <Text className="text-gray-700 text-base"> total id count.</Text>
              </View>

              <View className="flex-row flex-wrap items-baseline mb-6">
                <Text className="text-blue-500 text-xl font-semibold">397</Text>
                <Text className="text-gray-700 text-base"> numbers are available, </Text>
                <Text className="text-blue-400 text-xl font-semibold">99.25%</Text>
                <Text className="text-gray-700 text-base"> of </Text>
                <Text className="text-blue-500 text-xl font-semibold">400</Text>
                <Text className="text-gray-700 text-base"> total id count.</Text>
              </View>

              <View className="flex-row flex-wrap items-baseline mb-6">
                <Text className="text-gray-700 text-base">
                  On a daily log basis, base on the log count per day, it will only take approximately{' '}
                </Text>
                <Text className="text-red-500 text-xl font-bold">2 days</Text>
                <Text className="text-gray-700 text-base"> to make all numbers unavailable.</Text>
              </View>

              <View className="flex-row flex-wrap items-baseline mb-6">
                <Text className="text-gray-700 text-base">Would you like to return all </Text>
                <Text className="text-red-500 text-xl font-semibold">1</Text>
                <Text className="text-gray-700 text-base"> not signed out/unreturned numbers?</Text>
              </View>

              <View className="flex-col gap-3">
                <TouchableOpacity
                  onPress={() => router.push('/')}
                  className="bg-blue-500 px-4 py-3 rounded-full w-full"
                >
                  <Text className="text-white text-center font-medium text-base">Ask me next time</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => { }}
                  className="bg-red-400 px-4 py-3 rounded-full w-full"
                >
                  <Text className="text-white text-center font-medium text-base">Return all 1 numbers</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}