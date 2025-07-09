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
    <View className="w-80 flex-col justify-between py-6 px-6 bg-gray-50 border-l border-gray-200">
      <View className="gap-4">
        {/* Status indicators */}
        <View className="p-4 bg-gray-50 rounded-lg">
          <Text className="text-sm font-medium text-gray-600 mb-3">Status</Text>
          <View className="gap-2">
            <View className="flex-row items-center gap-2">
              <View className={`w-3 h-3 rounded-full ${enabledRequiredId ? (cardImageId ? 'bg-green-500' : 'bg-red-400') : 'bg-gray-400'}`} />
              <Text className="txt-sm text-gray-700">
                ID Snapshot {enabledRequiredId && <Text className="text-red-500">*</Text>}
              </Text>
            </View>
            <View className="flex-row items-center gap-2">
              <View className={`w-3 h-3 rounded-full ${enabledRequiredFace ? (faceImageId ? 'bg-green-500' : 'bg-red-400') : 'bg-gray-400'}`} />
              <Text className="text-sm text-gray-700">
                Photo Snapshot {enabledRequiredFace && <Text className="text-red-500">*</Text>}
              </Text>
            </View>
            <View className="flex-row items-center gap-2">
              <View className={`w-3 h-3 rounded-full ${isFormValid ? 'bg-green-500' : 'bg-gray-400'}`} />
              <Text className="text-sm text-gray-700">Form Complete</Text>
            </View>
          </View>
        </View>

        {/* Generated ID */}
        {nextAvailableId && (
          <View className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <Text className="text-sm font-medium text-blue-800 mb-1">
              Generated ID
            </Text>
            <Text className="text-lg font-bold text-blue-900">
              {id}
            </Text>
          </View>
        )}

        {/* Action Buttons */}
        <View className="gap-3">
          <TouchableOpacity
            onPress={onBack}
            className="bg-gray-100 rounded-lg py-4 border border-gray-200"
          >
            <Text className="text-gray-700 text-lg font-medium text-center">
              Back
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onSignIn}
            disabled={!isFormValid || isSignInLoading || isUploadingImages}
            className={`rounded-lg py-4 ${isFormValid && !isSignInLoading && !isUploadingImages
              ? 'bg-blue-500'
              : 'bg-blue-300'
              }`}
          >
            <Text className="text-white text-lg font-semibold text-center">
              {isSignInLoading || isUploadingImages ? 'Signing In...' : 'Sign In'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}; 