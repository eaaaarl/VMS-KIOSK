import { formattedDate } from '@/features/visitors/utils/FormattedDate';
import { setFaceImageId } from '@/lib/redux/state/visitorSlice';
import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

export default function FaceCamera() {
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
        const newFilename = `FACE_${timestamp}.png`;

        const fileUri = `${FileSystem.cacheDirectory}${newFilename}`;

        await FileSystem.moveAsync({
          from: photo.uri,
          to: fileUri
        });

        console.log('Photo captured with formatted name:', newFilename);
        console.log('Photo full path:', fileUri);

        // Alert.alert('Success', 'Face photo captured successfully!');
        dispatch(setFaceImageId({ faceImageId: newFilename }))
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
            <Ionicons name="person-outline" size={24} color="white" />
            <Text className="text-white text-lg font-semibold ml-2">
              Capture Face
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

      <View className="absolute top-20 left-0 right-0 bottom-0 justify-center items-center pointer-events-none">
        <View className="absolute top-20 left-0 right-0 bottom-0 justify-center items-center pointer-events-none">
          {/* Oval face guide */}
          <View
            className="border-2 border-white border-dashed bg-transparent"
            style={{
              width: 250,
              height: 320,
              borderRadius: 125, // Makes it oval
            }}>

            {/* Top instruction */}
            <View className="absolute -top-12 left-0 right-0">
              <Text className="text-white text-center text-sm font-medium">
                Position your face within the oval
              </Text>
            </View>

            {/* Bottom instruction */}
            <View className="absolute -bottom-8 left-0 right-0">
              <Text className="text-white text-center text-xs opacity-80">
                Keep your face centered and well-lit
              </Text>
            </View>
          </View>

          {/* Optional: Corner brackets for better visual guidance */}
          <View className="absolute" style={{ width: 250, height: 320 }}>
            {/* Top-left bracket */}
            <View className="absolute top-0 left-0">
              <View className="w-6 h-0.5 bg-yellow-400" />
              <View className="w-0.5 h-6 bg-yellow-400" />
            </View>

            {/* Top-right bracket */}
            <View className="absolute top-0 right-0">
              <View className="w-6 h-0.5 bg-yellow-400" />
              <View className="w-0.5 h-6 bg-yellow-400 ml-auto" />
            </View>

            {/* Bottom-left bracket */}
            <View className="absolute bottom-0 left-0">
              <View className="w-0.5 h-6 bg-yellow-400" />
              <View className="w-6 h-0.5 bg-yellow-400" />
            </View>

            {/* Bottom-right bracket */}
            <View className="absolute bottom-0 right-0">
              <View className="w-0.5 h-6 bg-yellow-400 ml-auto" />
              <View className="w-6 h-0.5 bg-yellow-400" />
            </View>
          </View>
        </View>
      </View>

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