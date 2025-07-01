import { useGetVisitorsReturnedQuery } from '@/features/visitors/api/visitorApi';
import { formattedDate } from '@/features/visitors/utils/FormattedDate';
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

export default function SelectPage() {
  const router = useRouter()
  const todaysDate = formattedDate(new Date());
  const { data: visitorsReturned } = useGetVisitorsReturnedQuery({ date: todaysDate });
  const countReturned = visitorsReturned?.results?.length || 0;

  const handleClose = () => {
    router.back()
  }

  const handleSetKioskFunction = () => {
    router.push('/(setting)/SettingKiosk')
  }



  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-black/50">
      <View className="bg-white rounded-t-2xl w-full max-w-md mx-4 overflow-hidden shadow-2xl">

        <View className="bg-blue-500 px-6 py-4 flex-row justify-between items-center">
          <Text className="text-white text-xl font-semibold">SELECT</Text>
          <TouchableOpacity
            onPress={handleClose}
            className="w-8 h-8 rounded-full bg-white/20 items-center justify-center"
          >
            <Text className="text-white text-lg font-bold">x</Text>
          </TouchableOpacity>
        </View>

        <View className="p-6 gap-4">

          <TouchableOpacity
            onPress={handleSetKioskFunction}
            className="bg-blue-50 border border-blue-200 rounded-full py-4 px-6 items-center"
          >
            <Text className="text-gray-800 text-lg font-medium">Set KIOSK Function</Text>
          </TouchableOpacity>

          <View
            className="bg-pink-50 border border-pink-200 rounded-full py-4 px-6 items-center flex-row justify-center"
          >
            <Text className="text-gray-600 text-lg font-medium mr-2">Return IDs</Text>
            <View className="bg-pink-500 rounded-full w-6 h-6 items-center justify-center">
              <Text className="text-white text-sm font-bold">{countReturned}</Text>
            </View>
          </View>

        </View>
      </View>
    </SafeAreaView>
  )
}