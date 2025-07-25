import * as FileSystem from 'expo-file-system';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface SignInCameraButtonsProps {
  idSnapshotTaken: boolean;
  photoSnapshotTaken: boolean;
  onIdSnapshot: () => void;
  onPhotoSnapshot: () => void;
  faceImageId?: string;
  cardImageId?: string;
}

export const SignInCameraButtons: React.FC<SignInCameraButtonsProps> = ({
  idSnapshotTaken,
  photoSnapshotTaken,
  onIdSnapshot,
  onPhotoSnapshot,
  faceImageId,
  cardImageId,
}) => {
  const getImageUri = (imageId: string | undefined) => {
    if (!imageId) return null;
    return `${FileSystem.cacheDirectory}${imageId}`;
  };

  const faceUri = getImageUri(faceImageId);
  const cardUri = getImageUri(cardImageId);

  return (
    <View className="mb-8 flex-row gap-4">
      <TouchableOpacity
        onPress={onIdSnapshot}
        className={`h-48 flex-1 items-center justify-center rounded-lg border-2 p-4 ${!idSnapshotTaken ? 'border-green-400 bg-green-50' : 'border-red-300 bg-red-50'}`}
      >
        {cardUri ? (
          <View className="items-center">
            <Image
              source={{ uri: cardUri }}
              className="mb-2 h-28 w-40 rounded"
              resizeMode="cover"
            />
            <Text className="text-center text-base font-medium text-gray-700">ID Snapshot</Text>
          </View>
        ) : (
          <View className="items-center">
            <View className="mb-2 h-12 w-16 items-center justify-center rounded border-2 border-gray-400">
              <View className="h-6 w-6 rounded-full bg-gray-600" />
            </View>
            <Text className="text-center text-base font-medium text-gray-700">ID Snapshot</Text>
          </View>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPhotoSnapshot}
        className={`h-48 flex-1 items-center justify-center rounded-lg border-2 p-4 ${!photoSnapshotTaken ? 'border-green-400 bg-green-50' : 'border-red-300 bg-yellow-50'}`}
      >
        {faceUri ? (
          <View className="items-center">
            <Image
              source={{ uri: faceUri }}
              className="mb-2 h-32 w-32 rounded-full"
              resizeMode="cover"
            />
            <Text className="text-center text-base font-medium text-gray-700">Photo Snapshot</Text>
          </View>
        ) : (
          <View className="items-center">
            <View className="mb-2 h-14 w-14 items-center justify-center rounded-full border-2 border-gray-400">
              <View className="h-8 w-8 rounded-full bg-gray-300" />
            </View>
            <Text className="text-center text-base font-medium text-gray-700">Photo Snapshot</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};
