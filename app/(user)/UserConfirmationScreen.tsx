import { useUserLoginMutation } from '@/features/user/api/userApi'
import { useAppDispatch } from '@/lib/redux/hook'
import { setKioskSettingId } from '@/lib/redux/state/kioskSlice'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Toast from 'react-native-toast-message'

export default function UserConfirmationScreen() {
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
      {/* Header */}
      <View className="bg-blue-500 px-4 py-3 flex-row justify-between items-center">
        <Text className="text-white text-base sm:text-lg font-semibold flex-1 mr-2" numberOfLines={2}>
          PLEASE CONFIRM (ADMIN ACCOUNT)
        </Text>
        <TouchableOpacity
          onPress={handleBack}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 items-center justify-center"
        >
          <Text className="text-white text-lg sm:text-xl font-bold">×</Text>
        </TouchableOpacity>
      </View>

      {/* Content with KeyboardAvoidingView */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 justify-center px-4 py-6">
            {/* Form Container */}
            <View className="bg-white rounded-lg shadow-lg mx-2">
              <View className="border-2 border-blue-300 rounded-lg p-4 sm:p-6 m-2 sm:m-4">
                {/* Username Field */}
                <View className="mb-4 sm:mb-6">
                  <Text className="text-gray-700 text-base sm:text-lg font-medium mb-2">
                    Username
                  </Text>
                  <View className="border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 bg-gray-50">
                    <TextInput
                      value={username}
                      onChangeText={setUsername}
                      placeholder="Enter username"
                      className="text-gray-700 text-base sm:text-lg"
                      autoCapitalize="none"
                      editable={!isLoading}
                      autoCorrect={false}
                      placeholderTextColor="gray"
                    />
                  </View>
                </View>

                {/* Password Field */}
                <View className="mb-6 sm:mb-8">
                  <Text className="text-gray-700 text-base sm:text-lg font-medium mb-2">
                    Password
                  </Text>
                  <View className="border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 bg-gray-50">
                    <TextInput
                      value={password}
                      onChangeText={setPassword}
                      placeholder="Enter password"
                      placeholderTextColor="gray"
                      secureTextEntry
                      className="text-gray-700 text-base sm:text-lg"
                      editable={!isLoading}
                      autoCorrect={false}
                    />
                  </View>
                </View>

                {/* Confirm Button */}
                <View className="items-center sm:items-end">
                  <TouchableOpacity
                    onPress={handleConfirm}
                    disabled={isLoading}
                    className={`bg-blue-500 px-8 sm:px-12 py-3 rounded-full shadow-md min-w-[120px] ${isLoading ? 'opacity-50' : ''}`}
                  >
                    <Text className="text-white text-base sm:text-lg font-semibold text-center">
                      {isLoading ? 'Loading...' : 'Confirm'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}