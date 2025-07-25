import React from 'react';
import { Text, View } from 'react-native';

interface FaceCameraOverlayProps {
  isTablet: boolean;
  ovalWidth: number;
  ovalHeight: number;
  headerHeight: number;
  countdown: number | null;
}

export const FaceCameraOverlay: React.FC<FaceCameraOverlayProps> = ({
  isTablet,
  ovalWidth,
  ovalHeight,
  headerHeight,
  countdown,
}) => (
  <View
    className="pointer-events-none absolute left-0 right-0 items-center justify-center"
    style={{ top: headerHeight, bottom: 0 }}
  >
    <View className="items-center justify-center">
      {/* Countdown Display */}
      {countdown !== null && (
        <View className="absolute z-20 h-20 w-20 items-center justify-center rounded-full bg-black/70">
          <Text className="text-4xl font-bold text-white">{countdown}</Text>
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
          <Text
            className={`text-center font-medium text-white ${isTablet ? 'text-lg' : 'text-sm'}`}
          >
            {countdown !== null ? 'Get Ready!' : 'Position your face within the oval'}
          </Text>
        </View>
        {/* Bottom instruction */}
        <View className="absolute left-0 right-0" style={{ bottom: isTablet ? -40 : -32 }}>
          <Text
            className={`text-center text-white opacity-80 ${isTablet ? 'text-base' : 'text-xs'}`}
          >
            Keep your face centered and well-lit
          </Text>
        </View>
      </View>
      {/* Corner brackets */}
      <View className="absolute" style={{ width: ovalWidth, height: ovalHeight }}>
        {/* Top-left bracket */}
        <View className="absolute left-0 top-0">
          <View className={`bg-yellow-400 ${isTablet ? 'h-1 w-10' : 'h-0.5 w-6'}`} />
          <View className={`bg-yellow-400 ${isTablet ? 'h-10 w-1' : 'h-6 w-0.5'}`} />
        </View>
        {/* Top-right bracket */}
        <View className="absolute right-0 top-0">
          <View className={`bg-yellow-400 ${isTablet ? 'h-1 w-10' : 'h-0.5 w-6'}`} />
          <View className={`ml-auto bg-yellow-400 ${isTablet ? 'h-10 w-1' : 'h-6 w-0.5'}`} />
        </View>
        {/* Bottom-left bracket */}
        <View className="absolute bottom-0 left-0">
          <View className={`bg-yellow-400 ${isTablet ? 'h-10 w-1' : 'h-6 w-0.5'}`} />
          <View className={`bg-yellow-400 ${isTablet ? 'h-1 w-10' : 'h-0.5 w-6'}`} />
        </View>
        {/* Bottom-right bracket */}
        <View className="absolute bottom-0 right-0">
          <View className={`ml-auto bg-yellow-400 ${isTablet ? 'h-10 w-1' : 'h-6 w-0.5'}`} />
          <View className={`bg-yellow-400 ${isTablet ? 'h-1 w-10' : 'h-0.5 w-6'}`} />
        </View>
      </View>
    </View>
  </View>
);
