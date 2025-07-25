import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface IDCameraControlsProps {
  isTablet: boolean;
  bottomPadding: number;
  cameraReady: boolean;
  isCapturing: boolean;
  countdown: number | null;
  onStartCountdown: () => void;
  onCancelCountdown: () => void;
}

export const IDCameraControls: React.FC<IDCameraControlsProps> = ({
  isTablet,
  bottomPadding,
  cameraReady,
  isCapturing,
  countdown,
  onStartCountdown,
  onCancelCountdown,
}) => {
  return (
    <View className="absolute left-0 right-0 items-center" style={{ bottom: bottomPadding }}>
      {countdown === null ? (
        <TouchableOpacity
          onPress={onStartCountdown}
          disabled={!cameraReady || isCapturing}
          className={`rounded-full p-4 ${!cameraReady || isCapturing ? 'bg-gray-500' : 'bg-white'}`}
        >
          <View className="h-16 w-16 rounded-full border-4 border-red-500" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onCancelCountdown} className="rounded-full bg-red-500 p-4">
          <Text className="font-bold text-white">Cancel</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
