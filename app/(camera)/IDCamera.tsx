import { IDCameraControls } from '@/features/camera/components/IDCameraControls';
import { IDCameraHeader } from '@/features/camera/components/IDCameraHeader';
import { IDCameraOverlay } from '@/features/camera/components/IDCameraOverlay';
import { useIDCameraScreen } from '@/features/camera/hooks/useIDCameraScreen';
import { CameraView } from 'expo-camera';
import { router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function IDCameraScreen() {
  const {
    isTablet,
    cardWidth,
    cardHeight,
    headerHeight,
    bottomPadding,
    cameraRef,
    cameraState,
    permission,
    requestPermission,
    handleCameraReady,
    startCountdown,
    cancelCountdown,
  } = useIDCameraScreen();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 items-center justify-center bg-black px-6">
        <IDCameraHeader
          isTablet={isTablet}
          headerHeight={headerHeight}
          onClose={() => router.back()}
        />
        <View className="flex-1 items-center justify-center">
          <View className="mb-6">
            <Text className={`text-center text-white ${isTablet ? 'text-2xl' : 'text-lg'}`}>
              We need your permission to show the camera
            </Text>
          </View>
          <TouchableOpacity
            onPress={requestPermission}
            className={`rounded-full bg-yellow-400 ${isTablet ? 'px-12 py-4' : 'px-6 py-3'}`}
          >
            <Text className={`font-semibold text-black ${isTablet ? 'text-xl' : 'text-base'}`}>
              Grant Permission
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <IDCameraHeader
        isTablet={isTablet}
        headerHeight={headerHeight}
        onClose={() => router.back()}
      />
      <View className="flex-1" style={{ marginTop: headerHeight }}>
        <CameraView
          ref={cameraRef}
          style={{ flex: 1 }}
          facing="front"
          onCameraReady={handleCameraReady}
        />
      </View>
      <IDCameraOverlay
        isTablet={isTablet}
        cardWidth={cardWidth}
        cardHeight={cardHeight}
        headerHeight={headerHeight}
        countdown={cameraState.countdown}
      />
      <IDCameraControls
        isTablet={isTablet}
        bottomPadding={bottomPadding}
        cameraReady={cameraState.cameraReady}
        isCapturing={cameraState.isCapturing}
        countdown={cameraState.countdown}
        onStartCountdown={startCountdown}
        onCancelCountdown={cancelCountdown}
      />
    </View>
  );
}
