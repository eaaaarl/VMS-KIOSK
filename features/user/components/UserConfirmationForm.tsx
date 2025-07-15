import React from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface UserConfirmationFormProps {
  username: string;
  password: string;
  isLoading: boolean;
  onUsernameChange: (text: string) => void;
  onPasswordChange: (text: string) => void;
  onConfirm: () => void;
  onBack: () => void;
}

const UserConfirmationForm: React.FC<UserConfirmationFormProps> = ({
  username,
  password,
  isLoading,
  onUsernameChange,
  onPasswordChange,
  onConfirm,
  onBack,
}) => (
  <SafeAreaView className="flex-1 bg-gray-100 mt-10">
    {/* Header */}
    <View className="bg-blue-500 px-4 py-3 flex-row justify-between items-center">
      <Text className="text-white text-base sm:text-lg font-semibold flex-1 mr-2" numberOfLines={2}>
        PLEASE CONFIRM (ADMIN ACCOUNT)
      </Text>
      <TouchableOpacity
        onPress={onBack}
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
                    onChangeText={onUsernameChange}
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
                    onChangeText={onPasswordChange}
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
                  onPress={onConfirm}
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

export default UserConfirmationForm 