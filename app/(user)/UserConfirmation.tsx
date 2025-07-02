import { useUserLoginMutation } from '@/features/user/api/userApi'
import { useAppDispatch } from '@/lib/redux/hook'
import { setKioskSettingId } from '@/lib/redux/state/kioskSlice'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Toast from 'react-native-toast-message'

export default function UserConfirmation() {
  const { kioskSettingId } = useLocalSearchParams()
  const dispatch = useAppDispatch()
  const [userLogin, { isLoading }] = useUserLoginMutation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  const handleConfirm = async () => {
    if (!username || !password) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Please enter both username and password',
        position: 'top'
      });
      return;
    }

    try {
      await userLogin({ username, password })
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Authentication successful',
        position: 'top'
      });

      dispatch(setKioskSettingId({ kioskSettingId: parseInt(kioskSettingId as string) }))
      router.replace('/(main)')
    } catch (error: any) {
      console.error(error)
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'An unexpected error occurred',
        position: 'top'
      });
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="bg-blue-500 px-6 py-4 flex-row justify-between items-center">
        <Text className="text-white text-xl font-semibold">PLEASE CONFIRM (ADMIN ACCOUNT)</Text>
        <TouchableOpacity
          onPress={handleBack}
          className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
        >
          <Text className="text-white text-xl font-bold">×</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View className="flex-1 justify-center px-6">
        {/* Form Container */}
        <View className="bg-white rounded-lg shadow-lg">
          <View className="border-2 border-blue-300 rounded-lg p-8 m-4">
            {/* Username Field */}
            <View className="mb-6">
              <View className="flex-row items-center">
                <Text className="text-gray-700 text-lg font-medium w-24 mr-4">Username</Text>
                <View className="flex-1 border border-gray-300 rounded-lg px-4 py-3 bg-gray-50">
                  <TextInput
                    value={username}
                    onChangeText={setUsername}
                    placeholder="username"
                    className="text-gray-700 text-lg"
                    autoCapitalize="none"
                    editable={!isLoading}
                  />
                </View>
              </View>
            </View>

            {/* Password Field */}
            <View className="mb-8">
              <View className="flex-row items-center">
                <Text className="text-gray-700 text-lg font-medium w-24 mr-4">Password</Text>
                <View className="flex-1 border border-gray-300 rounded-lg px-4 py-3 bg-gray-50">
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Password"
                    secureTextEntry
                    className="text-gray-700 text-lg"
                    editable={!isLoading}
                  />
                </View>
              </View>
            </View>

            {/* Confirm Button */}
            <View className="items-end">
              <TouchableOpacity
                onPress={handleConfirm}
                disabled={isLoading}
                className={`bg-blue-500 px-12 py-3 rounded-full shadow-md ${isLoading ? 'opacity-50' : ''}`}
              >
                <Text className="text-white text-lg font-semibold">
                  {isLoading ? 'Loading...' : 'Confirm'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}