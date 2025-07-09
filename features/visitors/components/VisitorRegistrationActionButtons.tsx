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
  registerButtonText
}: VisitorRegistrationActionButtonsProps) {
  return (
    <View className="w-80 px-6 py-6 bg-gray-50 border-l border-gray-200">
      <View className="flex-1 justify-center">
        <View className="gap-4">
          <TouchableOpacity
            onPress={onBack}
            className="bg-gray-100 rounded-lg py-4 border border-gray-200"
          >
            <Text className="text-gray-700 text-lg font-medium text-center">
              Back
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onSkip}
            className="bg-gray-200 rounded-lg py-4 border border-gray-200"
          >
            <Text className="text-gray-700 text-lg font-medium text-center">
              Skip, I&apos;m already registered
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onRegister}
            disabled={isRegisterButtonDisabled}
            className={`rounded-lg py-4 ${isRegisterButtonDisabled ? 'bg-blue-300' : 'bg-blue-500'}`}
          >
            <Text className="text-white text-lg font-semibold text-center">
              {registerButtonText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Optional: Status or Info Section */}
      <View className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <Text className="text-blue-800 text-sm font-medium mb-1">
          Registration Info
        </Text>
        <Text className="text-blue-600 text-xs">
          Fill out all required fields to complete your visitor registration.
        </Text>
      </View>
    </View>
  );
} 