import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type VisitorRegistrationActionButtonsProps = {
  onBack: () => void;
  onSkip: () => void;
  onRegister: () => void;
  isRegisterButtonDisabled: boolean;
  registerButtonText: string;
};

export default function VisitorRegistrationActionButtons({
  onBack,
  onSkip,
  onRegister,
  isRegisterButtonDisabled,
  registerButtonText,
}: VisitorRegistrationActionButtonsProps) {
  return (
    <View className="w-80 border-l border-gray-200 bg-gray-50 px-6 py-6">
      <View className="flex-1 justify-center">
        <View className="gap-4">
          <TouchableOpacity
            onPress={onBack}
            className="rounded-lg border border-gray-200 bg-gray-100 py-4"
          >
            <Text className="text-center text-lg font-medium text-gray-700">Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onSkip}
            className="rounded-lg border border-gray-200 bg-gray-200 py-4"
          >
            <Text className="text-center text-lg font-medium text-gray-700">
              Skip, I&apos;m already registered
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onRegister}
            disabled={isRegisterButtonDisabled}
            className={`rounded-lg py-4 ${isRegisterButtonDisabled ? 'bg-blue-300' : 'bg-blue-500'}`}
          >
            <Text className="text-center text-lg font-semibold text-white">
              {registerButtonText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Optional: Status or Info Section */}
      <View className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
        <Text className="mb-1 text-sm font-medium text-blue-800">Registration Info</Text>
        <Text className="text-xs text-blue-600">
          Fill out all required fields to complete your visitor registration.
        </Text>
      </View>
    </View>
  );
}
