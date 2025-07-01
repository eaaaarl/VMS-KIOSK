import { useRouter } from 'expo-router'
import React from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'

export default function SelectPage() {
  const router = useRouter()

  const handleClose = () => {
    router.back()
  }

  const handleSetKioskFunction = () => {
    router.push('/(setting)/SettingKiosk')
  }

  const handleReturnIDs = () => {
    console.log('Return IDs selected')
  }

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-black/50">
      {/* Modal Container */}
      <View className="bg-white rounded-t-2xl w-full max-w-md mx-4 overflow-hidden shadow-2xl">

        {/* Header */}
        <View className="bg-blue-500 px-6 py-4 flex-row justify-between items-center">
          <Text className="text-white text-xl font-semibold">SELECT</Text>
          <TouchableOpacity
            onPress={handleClose}
            className="w-8 h-8 rounded-full bg-white/20 items-center justify-center"
          >
            <Text className="text-white text-lg font-bold">x</Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View className="p-6 gap-4">

          {/* Set KIOSK Function Button */}
          <TouchableOpacity
            onPress={handleSetKioskFunction}
            className="bg-blue-50 border border-blue-200 rounded-full py-4 px-6 items-center"
          >
            <Text className="text-gray-800 text-lg font-medium">Set KIOSK Function</Text>
          </TouchableOpacity>

          {/* Return IDs Button */}
          <TouchableOpacity
            onPress={handleReturnIDs}
            className="bg-pink-50 border border-pink-200 rounded-full py-4 px-6 items-center flex-row justify-center"
          >
            <Text className="text-gray-600 text-lg font-medium mr-2">Return IDs</Text>
            <View className="bg-pink-500 rounded-full w-6 h-6 items-center justify-center">
              <Text className="text-white text-sm font-bold">1</Text>
            </View>
          </TouchableOpacity>

        </View>
      </View>
    </SafeAreaView>
  )
}