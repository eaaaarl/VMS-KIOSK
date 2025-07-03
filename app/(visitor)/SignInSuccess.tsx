import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

export default function SignInSuccess() {
  const handleDone = () => {
    // Handle navigation or completion action
    console.log('Done pressed')
  }

  return (
    <View className="flex-1 bg-white px-6 py-12 justify-center items-center">
      {/* Success Message */}
      <Text className="text-4xl font-bold text-green-500 text-center mb-6">
        Signed In Successfully!
      </Text>

      {/* Instruction Text */}
      <Text className="text-lg text-gray-600 text-center mb-12">
        Please claim your ticket!
      </Text>

      {/* Ticket Number */}
      <Text className="text-6xl font-bold text-blue-500 text-center mb-6">
        00-0014
      </Text>

      {/* User Name */}
      <Text className="text-xl font-semibold text-gray-700 text-center mb-16">
        HERNANDEZ, JOCELYN A
      </Text>

      {/* Done Button */}
      <TouchableOpacity
        onPress={handleDone}
        className="bg-blue-500 px-12 py-4 rounded-full shadow-lg"
        activeOpacity={0.8}
      >
        <Text className="text-white text-lg font-semibold">
          Done
        </Text>
      </TouchableOpacity>
    </View>
  )
}