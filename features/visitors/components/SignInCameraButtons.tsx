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
    <View className="flex-row gap-4 mb-8">
      <TouchableOpacity
        onPress={onIdSnapshot}
        className={`flex-1 border-2 rounded-lg p-4 items-center justify-center h-48 ${!idSnapshotTaken ? 'border-green-400 bg-green-50' : 'border-red-300 bg-red-50'}`}
      >
        {cardUri ? (
          <View className="items-center">
            <Image
              source={{ uri: cardUri }}
              className="w-40 h-28 rounded mb-2"
              resizeMode="cover"
            />
            <Text className="text-base font-medium text-gray-700 text-center">
              ID Snapshot
            </Text>
          </View>
        ) : (
          <View className="items-center">
            <View className="w-16 h-12 border-2 border-gray-400 rounded mb-2 items-center justify-center">
              <View className="w-6 h-6 bg-gray-600 rounded-full" />
            </View>
            <Text className="text-base font-medium text-gray-700 text-center">
              ID Snapshot
            </Text>
          </View>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPhotoSnapshot}
        className={`flex-1 border-2 rounded-lg p-4 items-center justify-center h-48 ${!photoSnapshotTaken ? 'border-green-400 bg-green-50' : 'border-red-300 bg-yellow-50'}`}
      >
        {faceUri ? (
          <View className="items-center">
            <Image
              source={{ uri: faceUri }}
              className="w-32 h-32 rounded-full mb-2"
              resizeMode="cover"
            />
            <Text className="text-base font-medium text-gray-700 text-center">
              Photo Snapshot
            </Text>
          </View>
        ) : (
          <View className="items-center">
            <View className="w-14 h-14 border-2 border-gray-400 rounded-full mb-2 items-center justify-center">
              <View className="w-8 h-8 bg-gray-300 rounded-full" />
            </View>
            <Text className="text-base font-medium text-gray-700 text-center">
              Photo Snapshot
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}; 