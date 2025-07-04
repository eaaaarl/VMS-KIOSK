import { formattedDateTimeWithDashes } from '@/features/visitors/utils/FormattedDate';
import { setFaceImageId } from '@/lib/redux/state/visitorSlice';
import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

export default function FaceCamera() {
  const dispatch = useDispatch();
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null); // New state for countdown

  const { width, height } = Dimensions.get('window');
  const isTablet = width >= 768 || height >= 1024;

  // Responsive dimensions
  const ovalWidth = isTablet ? Math.min(width * 0.4, 350) : 250;
  const ovalHeight = isTablet ? Math.min(height * 0.45, 450) : 320;
  const headerHeight = isTablet ? 80 : 60;
  const bottomPadding = isTablet ? 40 : 20;

  // Countdown timer effect
  useEffect(() => {
    let timer: any;
    if (countdown && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      takePicture();
      setCountdown(null);
    }
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countdown]);

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

  const startCountdown = () => {
    if (cameraReady && !isCapturing) {
      setCountdown(3); // 3 second countdown
    }
  };

  const cancelCountdown = () => {
    setCountdown(null);
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

        const timestamp = formattedDateTimeWithDashes(new Date());
        const newFilename = `face_${timestamp}.png`;
        const fileUri = `${FileSystem.cacheDirectory}${newFilename}`;

        await FileSystem.moveAsync({
          from: photo.uri,
          to: fileUri
        });

        dispatch(setFaceImageId({ faceImageId: newFilename }));
        router.replace('/(visitor)/SignInScreen');
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
            <Ionicons name="person-outline" size={isTablet ? 32 : 24} color="white" />
            <Text className={`text-white font-semibold ml-3 ${isTablet ? 'text-2xl' : 'text-lg'}`}>
              Capture Face
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

      {/* Face Guide Overlay */}
      <View
        className="absolute left-0 right-0 justify-center items-center pointer-events-none"
        style={{ top: headerHeight, bottom: 0 }}
      >
        <View className="justify-center items-center">
          {/* Countdown Display */}
          {countdown !== null && (
            <View className="absolute z-20 bg-black/70 rounded-full w-20 h-20 justify-center items-center">
              <Text className="text-white text-4xl font-bold">
                {countdown}
              </Text>
            </View>
          )}

          {/* Oval face guide */}
          <View
            className={`border-2 border-dashed bg-transparent ${countdown !== null ? 'border-yellow-400' : 'border-white'}`}
            style={{
              width: ovalWidth,
              height: ovalHeight,
              borderRadius: ovalWidth / 2,
            }}
          >
            {/* Top instruction */}
            <View className="absolute left-0 right-0" style={{ top: isTablet ? -60 : -48 }}>
              <Text className={`text-white text-center font-medium ${isTablet ? 'text-lg' : 'text-sm'}`}>
                {countdown !== null ? 'Get Ready!' : 'Position your face within the oval'}
              </Text>
            </View>

            {/* Bottom instruction */}
            <View className="absolute left-0 right-0" style={{ bottom: isTablet ? -40 : -32 }}>
              <Text className={`text-white text-center opacity-80 ${isTablet ? 'text-base' : 'text-xs'}`}>
                Keep your face centered and well-lit
              </Text>
            </View>
          </View>

          {/* Corner brackets */}
          <View className="absolute" style={{ width: ovalWidth, height: ovalHeight }}>
            {/* Top-left bracket */}
            <View className="absolute top-0 left-0">
              <View className={`bg-yellow-400 ${isTablet ? 'w-10 h-1' : 'w-6 h-0.5'}`} />
              <View className={`bg-yellow-400 ${isTablet ? 'w-1 h-10' : 'w-0.5 h-6'}`} />
            </View>
            {/* Top-right bracket */}
            <View className="absolute top-0 right-0">
              <View className={`bg-yellow-400 ${isTablet ? 'w-10 h-1' : 'w-6 h-0.5'}`} />
              <View className={`bg-yellow-400 ml-auto ${isTablet ? 'w-1 h-10' : 'w-0.5 h-6'}`} />
            </View>
            {/* Bottom-left bracket */}
            <View className="absolute bottom-0 left-0">
              <View className={`bg-yellow-400 ${isTablet ? 'w-1 h-10' : 'w-0.5 h-6'}`} />
              <View className={`bg-yellow-400 ${isTablet ? 'w-10 h-1' : 'w-6 h-0.5'}`} />
            </View>
            {/* Bottom-right bracket */}
            <View className="absolute bottom-0 right-0">
              <View className={`bg-yellow-400 ml-auto ${isTablet ? 'w-1 h-10' : 'w-0.5 h-6'}`} />
              <View className={`bg-yellow-400 ${isTablet ? 'w-10 h-1' : 'w-6 h-0.5'}`} />
            </View>
          </View>
        </View>
      </View>

      {/* Bottom Controls */}
      <View
        className="absolute bottom-3 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent"
        style={{ paddingBottom: bottomPadding, paddingTop: 16 }}
      >
        <View className="items-center">
          {countdown !== null ? (
            /* Cancel button during countdown */
            <TouchableOpacity
              onPress={cancelCountdown}
              className={`rounded-full ${isTablet ? 'py-5 px-12' : 'py-4 px-8'} bg-red-500`}
              style={{
                minWidth: isTablet ? 200 : 150,
                minHeight: isTablet ? 60 : 50,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Text className={`font-semibold ${isTablet ? 'text-xl' : 'text-lg'} text-white`}>
                Cancel
              </Text>
            </TouchableOpacity>
          ) : (
            /* Regular capture buttons */
            <View className="flex-row gap-4">
              {/* Manual capture */}
              <TouchableOpacity
                onPress={takePicture}
                disabled={!cameraReady || isCapturing}
                className={`rounded-full ${isTablet ? 'py-4 px-8' : 'py-3 px-6'} ${cameraReady && !isCapturing ? 'bg-yellow-400' : 'bg-gray-600'
                  }`}
                style={{
                  minWidth: isTablet ? 120 : 100,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Text
                  className={`font-semibold ${isTablet ? 'text-lg' : 'text-sm'} ${cameraReady && !isCapturing ? 'text-black' : 'text-gray-400'
                    }`}
                >
                  {isCapturing ? 'Capturing...' : 'Capture'}
                </Text>
              </TouchableOpacity>

              {/* Timer capture */}
              <TouchableOpacity
                onPress={startCountdown}
                disabled={!cameraReady || isCapturing}
                className={`rounded-full ${isTablet ? 'py-4 px-8' : 'py-3 px-6'} ${cameraReady && !isCapturing ? 'bg-blue-500' : 'bg-gray-600'
                  }`}
                style={{
                  minWidth: isTablet ? 120 : 100,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Text
                  className={`font-semibold ${isTablet ? 'text-lg' : 'text-sm'} ${cameraReady && !isCapturing ? 'text-white' : 'text-gray-400'
                    }`}
                >
                  Timer (3s)
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}