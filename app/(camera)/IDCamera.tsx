import { formattedDate } from '@/features/visitors/utils/FormattedDate';
import { setCardImageId } from '@/lib/redux/state/visitorSlice';
import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

export default function IDCamera() {
  const dispatch = useDispatch();
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 bg-black items-center justify-center px-6">
        <Text className="text-white text-lg text-center mb-4">
          We need your permission to show the camera
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          className="bg-yellow-400 rounded-full py-3 px-6"
        >
          <Text className="text-black font-semibold">Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleCameraReady = () => {
    setCameraReady(true);
  };

  const takePicture = async () => {
    if (cameraRef.current && cameraReady && !isCapturing) {
      try {
        setIsCapturing(true);
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
          skipProcessing: false,
        });

        const timestamp = formattedDate(new Date());
        const newFilename = `CARD_${timestamp}.png`;

        const fileUri = `${FileSystem.cacheDirectory}${newFilename}`;

        await FileSystem.moveAsync({
          from: photo.uri,
          to: fileUri
        });

        console.log('Photo captured with formatted name:', newFilename);
        console.log('Photo full path:', fileUri);

        // Alert.alert('Success', 'ID Card photo captured successfully!');
        dispatch(setCardImageId({ cardImageId: newFilename }))

        router.push('/(visitor)/SignInScreen')
      } catch (error) {
        console.error('Error taking picture:', error);
        Alert.alert('Error', 'Failed to capture photo. Please try again.');
      } finally {
        setIsCapturing(false);
      }
    }
  };

  return (
    <View className="flex-1 bg-black">
      <View className="absolute top-0 left-0 right-0 z-10 bg-red-500 pt-12 pb-4 px-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Ionicons name="card-outline" size={24} color="white" />
            <Text className="text-white text-lg font-semibold ml-2">
              Capture ID
            </Text>
          </View>
          <TouchableOpacity className="p-1" onPress={() => router.back()}>
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Camera View - NO CHILDREN */}
      <View className="flex-1 mt-20">
        <CameraView
          ref={cameraRef}
          style={{ flex: 1 }}
          facing='front'
          onCameraReady={handleCameraReady}
        />
      </View>

      {/* ID Card Overlay Guide - ABSOLUTE POSITIONED */}
      <View className="absolute top-20 left-0 right-0 bottom-0 justify-center items-center pointer-events-none">
        <View className="border-2 border-white border-dashed rounded-lg bg-transparent"
          style={{
            width: 300,
            height: 300 * 0.63,
          }}>
          <View className="absolute -top-8 left-0 right-0">
            <Text className="text-white text-center text-sm font-medium">
              Align ID within the frame
            </Text>
          </View>
        </View>
      </View>

      {/* Camera Controls - ABSOLUTE POSITIONED */}
      <View className="absolute bottom-0 left-0 right-0 pb-8 pt-4 bg-gradient-to-t from-black/80 to-transparent">
        <View className="items-center">
          <TouchableOpacity
            onPress={takePicture}
            disabled={!cameraReady || isCapturing}
            className={`rounded-full py-4 px-8 ${cameraReady && !isCapturing
              ? 'bg-yellow-400'
              : 'bg-gray-600'
              }`}
          >
            <Text
              className={`text-lg font-semibold ${cameraReady && !isCapturing
                ? 'text-black'
                : 'text-gray-400'
                }`}
            >
              {isCapturing ? 'Capturing...' : 'Take Snapshot'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}