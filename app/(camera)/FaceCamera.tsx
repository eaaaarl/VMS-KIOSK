import { FaceCameraControls } from '@/features/camera/components/FaceCameraControls';
import { FaceCameraHeader } from '@/features/camera/components/FaceCameraHeader';
import { FaceCameraOverlay } from '@/features/camera/components/FaceCameraOverlay';
import { useFaceCameraScreen } from '@/features/camera/hooks/useFaceCameraScreen';
import { CameraView } from 'expo-camera';
import { router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function FaceCameraScreen() {
  const {
    isTablet,
    ovalWidth,
    ovalHeight,
    headerHeight,
    bottomPadding,
    cameraRef,
    cameraState,
    permission,
    requestPermission,
    handleCameraReady,
    startCountdown,
    cancelCountdown,
    takePicture,
  } = useFaceCameraScreen();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 bg-black items-center justify-center px-6">
        <FaceCameraHeader isTablet={isTablet} headerHeight={headerHeight} onClose={() => router.back()} />
        <View className="flex-1 justify-center items-center">
          <View className="mb-6">
            <Text className={`text-white text-center ${isTablet ? 'text-2xl' : 'text-lg'}`}>We need your permission to show the camera</Text>
          </View>
          <TouchableOpacity
            onPress={requestPermission}
            className={`bg-yellow-400 rounded-full ${isTablet ? 'py-4 px-12' : 'py-3 px-6'}`}
          >
            <Text className={`text-black font-semibold ${isTablet ? 'text-xl' : 'text-base'}`}>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <FaceCameraHeader isTablet={isTablet} headerHeight={headerHeight} onClose={() => router.back()} />
      <View className="flex-1" style={{ marginTop: headerHeight }}>
        <CameraView
          ref={cameraRef}
          style={{ flex: 1 }}
          facing="front"
          onCameraReady={handleCameraReady}
        />
      </View>
      <FaceCameraOverlay
        isTablet={isTablet}
        ovalWidth={ovalWidth}
        ovalHeight={ovalHeight}
        headerHeight={headerHeight}
        countdown={cameraState.countdown}
      />
      <FaceCameraControls
        isTablet={isTablet}
        bottomPadding={bottomPadding}
        cameraReady={cameraState.cameraReady}
        isCapturing={cameraState.isCapturing}
        countdown={cameraState.countdown}
        onTakePicture={takePicture}
        onStartCountdown={startCountdown}
        onCancelCountdown={cancelCountdown}
      />
    </View>
  );
} 