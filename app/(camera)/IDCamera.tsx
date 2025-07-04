import { setCardImageId } from '@/lib/redux/state/visitorSlice';
import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Alert, Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

export default function IDCamera() {
  const dispatch = useDispatch();
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);

  const { width, height } = Dimensions.get('window');
  const isTablet = width >= 768 || height >= 1024;

  // Responsive dimensions for ID card frame
  const cardWidth = isTablet ? Math.min(width * 0.6, 400) : 300;
  const cardHeight = cardWidth * 0.63; // Standard ID card ratio
  const headerHeight = isTablet ? 80 : 60;
  const bottomPadding = isTablet ? 40 : 20;

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 bg-black items-center justify-center px-6">
        <Text className={`text-white text-center mb-6 ${isTablet ? 'text-2xl' : 'text-lg'}`}>
          We need your permission to show the camera
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          className={`bg-yellow-400 rounded-full ${isTablet ? 'py-4 px-12' : 'py-3 px-6'}`}
        >
          <Text className={`text-black font-semibold ${isTablet ? 'text-xl' : 'text-base'}`}>
            Grant Permission
          </Text>
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

        const now = new Date();
        const formattedDate = now.toISOString().split('T')[0]; // YYYY-MM-DD
        const formattedTime = now.toTimeString().split(' ')[0].replace(/:/g, '-'); // HH-mm-ss
        const newFilename = `id_${formattedDate}_${formattedTime}.png`;

        const fileUri = `${FileSystem.cacheDirectory}${newFilename}`;

        await FileSystem.moveAsync({
          from: photo.uri,
          to: fileUri
        });

        dispatch(setCardImageId({ cardImageId: newFilename }))

        router.replace('/(visitor)/SignInScreen')

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
      {/* Header */}
      <View
        className="absolute top-0 left-0 right-0 z-10 bg-red-500 px-4"
        style={{ paddingTop: isTablet ? 20 : 48, paddingBottom: 16, height: headerHeight }}
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Ionicons name="card-outline" size={isTablet ? 32 : 24} color="white" />
            <Text className={`text-white font-semibold ml-3 ${isTablet ? 'text-2xl' : 'text-lg'}`}>
              Capture ID
            </Text>
          </View>
          <TouchableOpacity
            className={`p-2 ${isTablet ? 'p-3' : 'p-1'}`}
            onPress={() => router.back()}
          >
            <Ionicons name="close" size={isTablet ? 32 : 24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Camera View */}
      <View className="flex-1" style={{ marginTop: headerHeight }}>
        <CameraView
          ref={cameraRef}
          style={{ flex: 1 }}
          facing='front'
          onCameraReady={handleCameraReady}
        />
      </View>

      {/* ID Card Overlay Guide */}
      <View
        className="absolute left-0 right-0 justify-center items-center pointer-events-none"
        style={{ top: headerHeight, bottom: 0 }}
      >
        <View className="justify-center items-center">
          {/* ID Card Frame */}
          <View
            className="border-2 border-white border-dashed rounded-lg bg-transparent"
            style={{
              width: cardWidth,
              height: cardHeight,
            }}
          >
            {/* Top instruction */}
            <View className="absolute left-0 right-0" style={{ top: isTablet ? -60 : -48 }}>
              <Text className={`text-white text-center font-medium ${isTablet ? 'text-lg' : 'text-sm'}`}>
                Align ID within the frame
              </Text>
            </View>

            {/* Bottom instruction */}
            <View className="absolute left-0 right-0" style={{ bottom: isTablet ? -40 : -32 }}>
              <Text className={`text-white text-center opacity-80 ${isTablet ? 'text-base' : 'text-xs'}`}>
                Ensure all text is clear and readable
              </Text>
            </View>
          </View>

          {/* Corner brackets for ID card */}
          <View className="absolute" style={{ width: cardWidth, height: cardHeight }}>
            {/* Top-left bracket */}
            <View className="absolute top-0 left-0">
              <View className={`bg-yellow-400 ${isTablet ? 'w-8 h-1' : 'w-6 h-0.5'}`} />
              <View className={`bg-yellow-400 ${isTablet ? 'w-1 h-8' : 'w-0.5 h-6'}`} />
            </View>

            {/* Top-right bracket */}
            <View className="absolute top-0 right-0">
              <View className={`bg-yellow-400 ${isTablet ? 'w-8 h-1' : 'w-6 h-0.5'}`} />
              <View className={`bg-yellow-400 ml-auto ${isTablet ? 'w-1 h-8' : 'w-0.5 h-6'}`} />
            </View>

            {/* Bottom-left bracket */}
            <View className="absolute bottom-0 left-0">
              <View className={`bg-yellow-400 ${isTablet ? 'w-1 h-8' : 'w-0.5 h-6'}`} />
              <View className={`bg-yellow-400 ${isTablet ? 'w-8 h-1' : 'w-6 h-0.5'}`} />
            </View>

            {/* Bottom-right bracket */}
            <View className="absolute bottom-0 right-0">
              <View className={`bg-yellow-400 ml-auto ${isTablet ? 'w-1 h-8' : 'w-0.5 h-6'}`} />
              <View className={`bg-yellow-400 ${isTablet ? 'w-8 h-1' : 'w-6 h-0.5'}`} />
            </View>
          </View>

          {/* ID Card Guidelines */}
          <View className="absolute" style={{ width: cardWidth, height: cardHeight }}>
            {/* Horizontal center line */}
            <View
              className="absolute left-0 right-0 bg-white opacity-30"
              style={{
                top: cardHeight / 2 - 0.5,
                height: 1,
                marginHorizontal: isTablet ? 40 : 30
              }}
            />

            {/* Vertical center line */}
            <View
              className="absolute top-0 bottom-0 bg-white opacity-30"
              style={{
                left: cardWidth / 2 - 0.5,
                width: 1,
                marginVertical: isTablet ? 30 : 20
              }}
            />
          </View>
        </View>
      </View>

      <View
        className="absolute bottom-3 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent"
        style={{ paddingBottom: bottomPadding, paddingTop: 16 }}
      >
        <View className="items-center">
          <TouchableOpacity
            onPress={takePicture}
            disabled={!cameraReady || isCapturing}
            className={`rounded-full ${isTablet ? 'py-5 px-12' : 'py-4 px-8'} ${cameraReady && !isCapturing ? 'bg-yellow-400' : 'bg-gray-600'
              }`}
            style={{
              minWidth: isTablet ? 200 : 150,
              minHeight: isTablet ? 60 : 50,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text
              className={`font-semibold ${isTablet ? 'text-xl' : 'text-lg'} ${cameraReady && !isCapturing ? 'text-black' : 'text-gray-400'
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