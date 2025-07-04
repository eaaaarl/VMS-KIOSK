import { useGetAllKioskSettingQuery, useGetKioskSettingQuery } from '@/features/kiosk/api/kioskApi'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hook'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'

export default function SettingKiosk() {
  const { kioskSettingId } = useAppSelector((state) => state.kiosk)
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { data } = useGetAllKioskSettingQuery()
  const kioskOptions = data?.results || []

  const [selectedKioskId, setSelectedKioskId] = useState<number | null>(kioskSettingId || null)

  const { data: kioskSetting } = useGetKioskSettingQuery(
    { id: selectedKioskId as number },
    { skip: !selectedKioskId }
  )
  const handleClose = () => {
    router.replace('/')
  }

  const handleSave = () => {
    if (selectedKioskId) {
      router.replace({
        pathname: '/(user)/UserConfirmationScreen',
        params: {
          kioskSettingId: selectedKioskId.toString()
        }
      })
    } else {
      alert('Please select a kiosk setting before saving.')
    }
  }

  const handleOptionSelect = (optionId: number) => {
    setSelectedKioskId(optionId)
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

            {/* Show loading or empty state */}
            {kioskOptions.length === 0 ? (
              <View className="py-8 items-center">
                <Text className="text-gray-500 text-lg">Loading kiosk settings...</Text>
              </View>
            ) : (
              kioskOptions.map((option, index) => (
                <TouchableOpacity
                  key={option.id}
                  onPress={() => handleOptionSelect(option.id)}
                  className={`flex-row py-4 px-4 items-center ${index !== kioskOptions.length - 1 ? 'border-b border-gray-200' : ''
                    } ${selectedKioskId === option.id ? 'bg-blue-50' : 'bg-white'}`}
                >
                  <View className="w-12 items-center">
                    <View className={`w-5 h-5 border-2 rounded ${selectedKioskId === option.id
                      ? 'bg-blue-500 border-blue-500'
                      : 'border-gray-400'
                      } items-center justify-center`}>
                      {selectedKioskId === option.id && (
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
              ))
            )}
          </View>

          {/* Action Buttons */}
          <View className="mt-6 flex-row justify-between items-center">
            <TouchableOpacity
              onPress={handleClose}
              className="bg-gray-500 px-6 py-3 rounded-lg"
            >
              <Text className="text-white font-semibold text-lg">Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSave}
              className={`px-8 py-3 rounded-lg ${selectedKioskId ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              disabled={!selectedKioskId}
            >
              <Text className={`font-semibold text-lg ${selectedKioskId ? 'text-white' : 'text-gray-500'
                }`}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}