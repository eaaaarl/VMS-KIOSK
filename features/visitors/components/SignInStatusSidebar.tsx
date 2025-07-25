import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface SignInStatusSidebarProps {
  enabledRequiredId: boolean;
  enabledRequiredFace: boolean;
  cardImageId: string;
  faceImageId: string;
  isFormValid: boolean | undefined;
  nextAvailableId: number;
  id: string;
  isSignInLoading: boolean;
  isUploadingImages: boolean;
  onBack: () => void;
  onSignIn: () => void;
}

export const SignInStatusSidebar: React.FC<SignInStatusSidebarProps> = ({
  enabledRequiredId,
  enabledRequiredFace,
  cardImageId,
  faceImageId,
  isFormValid,
  nextAvailableId,
  id,
  isSignInLoading,
  isUploadingImages,
  onBack,
  onSignIn,
}) => {
  return (
    <View className="w-80 flex-col justify-between border-l border-gray-200 bg-gray-50 px-6 py-6">
      <View className="gap-4">
        {/* Status indicators */}
        <View className="rounded-lg bg-gray-50 p-4">
          <Text className="mb-3 text-sm font-medium text-gray-600">Status</Text>
          <View className="gap-2">
            <View className="flex-row items-center gap-2">
              <View
                className={`h-3 w-3 rounded-full ${enabledRequiredId ? (cardImageId ? 'bg-green-500' : 'bg-red-400') : cardImageId ? 'bg-green-500' : 'bg-gray-400'}`}
              />
              <Text className="txt-sm text-gray-700">
                ID Snapshot {enabledRequiredId && <Text className="text-red-500">*</Text>}
              </Text>
            </View>
            <View className="flex-row items-center gap-2">
              <View
                className={`h-3 w-3 rounded-full ${enabledRequiredFace ? (faceImageId ? 'bg-green-500' : 'bg-red-400') : faceImageId ? 'bg-green-500' : 'bg-gray-400'}`}
              />
              <Text className="text-sm text-gray-700">
                Photo Snapshot {enabledRequiredFace && <Text className="text-red-500">*</Text>}
              </Text>
            </View>
            <View className="flex-row items-center gap-2">
              <View
                className={`h-3 w-3 rounded-full ${isFormValid ? 'bg-green-500' : 'bg-gray-400'}`}
              />
              <Text className="text-sm text-gray-700">Form Complete</Text>
            </View>
          </View>
        </View>

        {/* Generated ID */}
        {nextAvailableId && (
          <View className="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <Text className="mb-1 text-sm font-medium text-blue-800">Generated ID</Text>
            <Text className="text-lg font-bold text-blue-900">{id}</Text>
          </View>
        )}

        {/* Action Buttons */}
        <View className="gap-3">
          <TouchableOpacity
            onPress={onBack}
            className="rounded-lg border border-gray-200 bg-gray-100 py-4"
          >
            <Text className="text-center text-lg font-medium text-gray-700">Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onSignIn}
            disabled={!isFormValid || isSignInLoading || isUploadingImages}
            className={`rounded-lg py-4 ${
              isFormValid && !isSignInLoading && !isUploadingImages ? 'bg-blue-500' : 'bg-blue-300'
            }`}
          >
            <Text className="text-center text-lg font-semibold text-white">
              {isSignInLoading || isUploadingImages ? 'Signing In...' : 'Sign In'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
