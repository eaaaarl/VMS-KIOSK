import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { SelectScreenProps } from '../types/selectScreenTypes';

export default function SelectScreenUI({
  countReturned,
  onClose,
  onSetKioskFunction,
  onPrinterManagement,
}: SelectScreenProps) {
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-black/50">
      <View className="bg-white rounded-t-2xl w-full max-w-md mx-4 overflow-hidden shadow-2xl">
        <View className="bg-blue-500 px-6 py-4 flex-row justify-between items-center">
          <Text className="text-white text-xl font-semibold">SELECT</Text>
          <TouchableOpacity
            onPress={onClose}
            className="w-8 h-8 rounded-full bg-white/20 items-center justify-center"
          >
            <Text className="text-white text-lg font-bold">x</Text>
          </TouchableOpacity>
        </View>

        <View className="p-6 gap-4">
          <TouchableOpacity
            onPress={onSetKioskFunction}
            className="bg-blue-50 border border-blue-200 rounded-full py-4 px-6 items-center"
          >
            <Text className="text-gray-800 text-lg font-medium">Set KIOSK Function</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onPrinterManagement}
            className="bg-green-50 border border-green-200 rounded-full py-4 px-6 items-center"
          >
            <Text className="text-gray-800 text-lg font-medium">Printer Management</Text>
          </TouchableOpacity>

          <View className="bg-pink-50 border border-pink-200 rounded-full py-4 px-6 items-center flex-row justify-center">
            <Text className="text-gray-600 text-lg font-medium mr-2">Return IDs</Text>
            <View className="bg-pink-500 rounded-full w-6 h-6 items-center justify-center">
              <Text className="text-white text-sm font-bold">{countReturned}</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
} 