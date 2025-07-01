import { useGetKioskSettingQuery } from '@/features/kiosk/api/kioskApi'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'

export default function SettingKiosk() {
  const router = useRouter()
  const [selectedOption, setSelectedOption] = useState('Sign-In and Sign-out option')
  const { data } = useGetKioskSettingQuery()

  const kioskOptions = data?.results || []

  const handleClose = () => {
    router.back()
  }

  const handleSave = () => {
    console.log('Selected option:', selectedOption)
  }

  const handleOptionSelect = (optionName: string) => {
    setSelectedOption(optionName)
  }

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-black/50">
      {/* Modal Container */}
      <View className="bg-white rounded-2xl w-full max-w-4xl mx-4 overflow-hidden shadow-2xl">

        {/* Header */}
        <View className="bg-blue-500 px-6 py-4 flex-row justify-between items-center">
          <Text className="text-white text-xl font-semibold">Select a Setting for this KIOSK</Text>
          <TouchableOpacity
            onPress={handleClose}
            className="w-8 h-8 rounded-full bg-white/20 items-center justify-center"
          >
            <Text className="text-white text-xl font-bold">×</Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View className="p-6">

          {/* Table Container */}
          <View className="border border-gray-300 rounded-lg overflow-hidden">

            {/* Table Header */}
            <View className="bg-gray-100 flex-row py-3 px-4 border-b border-gray-300">
              <View className="w-12"></View>
              <View className="flex-1">
                <Text className="text-gray-800 font-bold text-lg">Name</Text>
              </View>
              <View className="flex-1">
                <Text className="text-gray-800 font-bold text-lg">Transaction Type</Text>
              </View>
            </View>

            {/* Table Rows */}
            {kioskOptions.map((option, index) => (
              <TouchableOpacity
                key={option.id}
                onPress={() => handleOptionSelect(option.name)}
                className={`flex-row py-4 px-4 items-center ${index !== kioskOptions.length - 1 ? 'border-b border-gray-200' : ''
                  } ${selectedOption === option.name ? 'bg-blue-50' : 'bg-white'}`}
              >
                <View className="w-12 items-center">
                  <View className={`w-5 h-5 border-2 rounded ${selectedOption === option.name
                    ? 'bg-blue-500 border-blue-500'
                    : 'border-gray-400'
                    } items-center justify-center`}>
                    {selectedOption === option.name && (
                      <Text className="text-white text-xs font-bold">✓</Text>
                    )}
                  </View>
                </View>

                <View className="flex-1">
                  <Text className="text-gray-800 text-base">{option.name}</Text>
                </View>

                <View className="flex-1">
                  <Text className="text-gray-600 text-base">{option.strTransactionType}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View className="mt-6 items-end">
            <TouchableOpacity
              onPress={handleSave}
              className="bg-blue-500 px-8 py-3 rounded-lg"
            >
              <Text className="text-white font-semibold text-lg">Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}