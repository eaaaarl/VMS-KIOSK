import { Ionicons } from '@expo/vector-icons';
import { CameraView } from 'expo-camera';
import { router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useCamera } from '../../features/camera/hooks/useCamera';
import { getCameraDimensions, getResponsiveDimensions } from '../../features/camera/utils/cameraUtils';

export default function IDCameraScreen() {
  const { isTablet } = getCameraDimensions();
  const { cardWidth, cardHeight, headerHeight, bottomPadding } = getResponsiveDimensions(isTablet);

  const {
    cameraRef,
    cameraState,
    permission,
    requestPermission,
    handleCameraReady,
    startCountdown,
    cancelCountdown, } = useCamera('id');

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
          {/* Countdown Display */}
          {cameraState.countdown !== null && (
            <View className="absolute z-20 bg-black/70 rounded-full w-20 h-20 justify-center items-center">
              <Text className="text-white text-4xl font-bold">
                {cameraState.countdown}
              </Text>
            </View>
          )}

          {/* ID Card Frame */}
          <View
            className={`border-2 border-dashed rounded-lg bg-transparent ${cameraState.countdown !== null ? 'border-yellow-400' : 'border-white'}`}
            style={{
              width: cardWidth,
              height: cardHeight,
            }}
          >
            {/* Top instruction */}
            <View className="absolute left-0 right-0" style={{ top: isTablet ? -60 : -48 }}>
              <Text className={`text-white text-center font-medium ${isTablet ? 'text-lg' : 'text-sm'}`}>
                {cameraState.countdown !== null ? 'Get Ready!' : 'Align ID within the frame'}
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

      {/* Capture Button */}
      <View
        className="absolute left-0 right-0 items-center"
        style={{ bottom: bottomPadding }}
      >
        {cameraState.countdown === null ? (
          <TouchableOpacity
            onPress={startCountdown}
            disabled={!cameraState.cameraReady || cameraState.isCapturing}
            className={`rounded-full p-4 ${!cameraState.cameraReady || cameraState.isCapturing ? 'bg-gray-500' : 'bg-white'}`}
          >
            <View className="w-16 h-16 rounded-full border-4 border-red-500" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={cancelCountdown}
            className="rounded-full p-4 bg-red-500"
          >
            <Text className="text-white font-bold">Cancel</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
} 