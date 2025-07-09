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
      <View className="flex-1 bg-black items-center justify-center px-6">
        <IDCameraHeader isTablet={isTablet} headerHeight={headerHeight} onClose={() => router.back()} />
        <View className="flex-1 justify-center items-center">
          <View className="mb-6">
            <Text className={`text-white text-center ${isTablet ? 'text-2xl' : 'text-lg'}`}>
              We need your permission to show the camera
            </Text>
          </View>
          <TouchableOpacity
            onPress={requestPermission}
            className={`bg-yellow-400 rounded-full ${isTablet ? 'py-4 px-12' : 'py-3 px-6'}`}
          >
            <Text className={`text-black font-semibold ${isTablet ? 'text-xl' : 'text-base'}`}>
              Grant Permission
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <IDCameraHeader isTablet={isTablet} headerHeight={headerHeight} onClose={() => router.back()} />
      <View className="flex-1" style={{ marginTop: headerHeight }}>
        <CameraView
          ref={cameraRef}
          style={{ flex: 1 }}
          facing='front'
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