import { CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Alert, StatusBar, Text, TouchableOpacity, View } from 'react-native';

export default function FaceCamera() {
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraReady, setCameraReady] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const cameraRef = useRef<CameraView>(null);

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

  const handleTakeSnapshot = async () => {
    if (cameraRef.current && cameraReady && !isCapturing) {
      try {
        setIsCapturing(true);
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
          skipProcessing: true,
        });
        console.log('Photo captured:', photo.uri);
        Alert.alert('Success', 'Face captured successfully!');
      } catch (error) {
        console.error('Error taking picture:', error);
        Alert.alert('Error', 'Failed to capture photo');
      } finally {
        setIsCapturing(false);
      }
    }
  };

  const handleClose = () => {
    console.log('Close camera');
    router.back();
  };

  return (
    <View className="flex-1 bg-black">
      <StatusBar hidden />
      {/* Header */}
      <View className="absolute top-0 left-0 right-0 z-10 bg-yellow-400 flex-row items-center justify-between px-4 py-3 pt-12">
        <View className="flex-row items-center">
          <View className="w-6 h-6 mr-2">
            <View className="w-4 h-4 bg-black rounded-full mt-1" />
          </View>
          <Text className="text-black text-lg font-semibold">
            Capture Face
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleClose}
          className="w-8 h-8 bg-yellow-600 rounded-full items-center justify-center"
        >
          <Text className="text-white text-lg font-bold">×</Text>
        </TouchableOpacity>
      </View>

      <CameraView
        ref={cameraRef}
        style={{ flex: 1 }}
        facing="front"
        onCameraReady={handleCameraReady}
      >
        <View className="flex-1 bg-transparent">
          {/* Face Guide Overlay */}
          <View className="flex-1 items-center justify-center">
            <View className="w-64 h-80 border-2 border-white border-dashed rounded-3xl opacity-50" />
          </View>
        </View>
      </CameraView>

      {/* Bottom Controls */}
      <View className="absolute bottom-0 left-0 right-0 pb-8 pt-4 bg-gradient-to-t from-black/80 to-transparent">
        <View className="items-center">
          <TouchableOpacity
            onPress={handleTakeSnapshot}
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