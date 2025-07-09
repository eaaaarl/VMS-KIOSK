import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface SignInCameraButtonsProps {
  idSnapshotTaken: boolean;
  photoSnapshotTaken: boolean;
  onIdSnapshot: () => void;
  onPhotoSnapshot: () => void;
}

export const SignInCameraButtons: React.FC<SignInCameraButtonsProps> = ({
  idSnapshotTaken,
  photoSnapshotTaken,
  onIdSnapshot,
  onPhotoSnapshot,
}) => {
  return (
    <View className="flex-row gap-4 mb-8">
      <TouchableOpacity
        onPress={onIdSnapshot}
        className={`flex-1 border-2 rounded-lg p-6 items-center justify-center h-32 ${!idSnapshotTaken ? 'border-green-400 bg-green-50' : 'border-red-300 bg-red-50'}`}
      >
        <View className="items-center">
          <View className="w-12 h-8 border-2 border-gray-400 rounded mb-2 items-center justify-center">
            <View className="w-4 h-4 bg-gray-600 rounded-full" />
          </View>
          <Text className="text-base font-medium text-gray-700 text-center">
            ID Snapshot
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPhotoSnapshot}
        className={`flex-1 border-2 rounded-lg p-6 items-center justify-center h-32 ${!photoSnapshotTaken ? 'border-green-400 bg-green-50' : 'border-red-300 bg-yellow-50'}`}
      >
        <View className="items-center">
          <View className="w-10 h-10 border-2 border-gray-400 rounded-full mb-2 items-center justify-center">
            <View className="w-6 h-6 bg-gray-300 rounded-full" />
          </View>
          <Text className="text-base font-medium text-gray-700 text-center">
            Photo Snapshot
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}; 