import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface FaceCameraControlsProps {
  isTablet: boolean;
  bottomPadding: number;
  cameraReady: boolean;
  isCapturing: boolean;
  countdown: number | null;
  onTakePicture: () => void;
  onStartCountdown: () => void;
  onCancelCountdown: () => void;
}

export const FaceCameraControls: React.FC<FaceCameraControlsProps> = ({
  isTablet,
  bottomPadding,
  cameraReady,
  isCapturing,
  countdown,
  onTakePicture,
  onStartCountdown,
  onCancelCountdown,
}) => (
  <View
    className="absolute bottom-3 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent"
    style={{ paddingBottom: bottomPadding, paddingTop: 16 }}
  >
    <View className="items-center">
      {countdown !== null ? (
        <TouchableOpacity
          onPress={onCancelCountdown}
          className={`rounded-full ${isTablet ? 'px-12 py-5' : 'px-8 py-4'} bg-red-500`}
          style={{
            minWidth: isTablet ? 200 : 150,
            minHeight: isTablet ? 60 : 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text className={`font-semibold ${isTablet ? 'text-xl' : 'text-lg'} text-white`}>
            Cancel
          </Text>
        </TouchableOpacity>
      ) : (
        <View className="flex-row gap-4">
          <TouchableOpacity
            onPress={onTakePicture}
            disabled={!cameraReady || isCapturing}
            className={`rounded-full ${isTablet ? 'px-8 py-4' : 'px-6 py-3'} ${cameraReady && !isCapturing ? 'bg-yellow-400' : 'bg-gray-600'}`}
            style={{
              minWidth: isTablet ? 120 : 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              className={`font-semibold ${isTablet ? 'text-lg' : 'text-sm'} ${cameraReady && !isCapturing ? 'text-black' : 'text-gray-400'}`}
            >
              {isCapturing ? 'Capturing...' : 'Capture'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onStartCountdown}
            disabled={!cameraReady || isCapturing}
            className={`rounded-full ${isTablet ? 'px-8 py-4' : 'px-6 py-3'} ${cameraReady && !isCapturing ? 'bg-blue-500' : 'bg-gray-600'}`}
            style={{
              minWidth: isTablet ? 120 : 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              className={`font-semibold ${isTablet ? 'text-lg' : 'text-sm'} ${cameraReady && !isCapturing ? 'text-white' : 'text-gray-400'}`}
            >
              Timer (3s)
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  </View>
);
