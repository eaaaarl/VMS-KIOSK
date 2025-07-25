import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { SelectScreenProps } from '../types/selectScreenTypes';

export default function SelectScreenUI({
  countReturned,
  onClose,
  onSetKioskFunction,
  onPrinterManagement,
  onIpPortConfiguration,
}: SelectScreenProps) {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-black/50">
      <View className="mx-4 w-full max-w-md overflow-hidden rounded-t-2xl bg-white shadow-2xl">
        <View className="flex-row items-center justify-between bg-blue-500 px-6 py-4">
          <Text className="text-xl font-semibold text-white">SELECT</Text>
          <TouchableOpacity
            onPress={onClose}
            className="h-8 w-8 items-center justify-center rounded-full bg-white/20"
          >
            <Text className="text-lg font-bold text-white">x</Text>
          </TouchableOpacity>
        </View>

        <View className="gap-4 p-6">
          <TouchableOpacity
            onPress={onSetKioskFunction}
            className="items-center rounded-full border border-blue-200 bg-blue-50 px-6 py-4"
          >
            <Text className="text-lg font-medium text-gray-800">Set KIOSK Function</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onPrinterManagement}
            className="items-center rounded-full border border-green-200 bg-green-50 px-6 py-4"
          >
            <Text className="text-lg font-medium text-gray-800">Printer Management</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onIpPortConfiguration}
            className="items-center rounded-full border border-purple-200 bg-purple-50 px-6 py-4"
          >
            <Text className="text-lg font-medium text-gray-800">
              IP Address & Port Configuration
            </Text>
          </TouchableOpacity>

          <View className="flex-row items-center justify-center rounded-full border border-pink-200 bg-pink-50 px-6 py-4">
            <Text className="mr-2 text-lg font-medium text-gray-600">Return IDs</Text>
            <View className="h-6 w-6 items-center justify-center rounded-full bg-pink-500">
              <Text className="text-sm font-bold text-white">{countReturned}</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
