import React from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
  <SafeAreaView className="flex-1 bg-gray-100">
    {/* Header */}
    <View className="flex-row items-center justify-between bg-blue-500 px-4 py-3">
      <Text className="mr-2 flex-1 text-base font-semibold text-white sm:text-lg" numberOfLines={2}>
        PLEASE CONFIRM (ADMIN ACCOUNT)
      </Text>
      <TouchableOpacity
        onPress={onBack}
        className="h-8 w-8 items-center justify-center rounded-full bg-white/20 sm:h-10 sm:w-10"
      >
        <Text className="text-lg font-bold text-white sm:text-xl">×</Text>
      </TouchableOpacity>
    </View>
    {/* Content with KeyboardAvoidingView */}
    <View className="flex-1 items-center justify-center px-4 py-6">
      {/* Form Container */}
      <View className="w-full max-w-md rounded-lg bg-white shadow-lg">
        <View className="m-2 rounded-lg border-2 border-blue-300 p-4 sm:m-4 sm:p-6">
          {/* Username Field */}
          <View className="mb-4 sm:mb-6">
            <Text className="mb-2 text-base font-medium text-gray-700 sm:text-lg">
              Username
            </Text>
            <View className="rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 sm:px-4 sm:py-3">
              <TextInput
                value={username}
                onChangeText={onUsernameChange}
                placeholder="Enter username"
                className="text-base text-gray-700 sm:text-lg"
                autoCapitalize="none"
                editable={!isLoading}
                autoCorrect={false}
                placeholderTextColor="gray"
              />
            </View>
          </View>
          {/* Password Field */}
          <View className="mb-6 sm:mb-8">
            <Text className="mb-2 text-base font-medium text-gray-700 sm:text-lg">
              Password
            </Text>
            <View className="rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 sm:px-4 sm:py-3">
              <TextInput
                value={password}
                onChangeText={onPasswordChange}
                placeholder="Enter password"
                placeholderTextColor="gray"
                secureTextEntry
                className="text-base text-gray-700 sm:text-lg"
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
              className={`min-w-[120px] rounded-full bg-blue-500 px-8 py-3 shadow-md sm:px-12 ${isLoading ? 'opacity-50' : ''}`}
            >
              <Text className="text-center text-base font-semibold text-white sm:text-lg">
                {isLoading ? 'Loading...' : 'Confirm'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  </SafeAreaView>
);

export default UserConfirmationForm;
