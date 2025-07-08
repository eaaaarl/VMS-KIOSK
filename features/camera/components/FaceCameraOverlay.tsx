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
    className="absolute left-0 right-0 justify-center items-center pointer-events-none"
    style={{ top: headerHeight, bottom: 0 }}
  >
    <View className="justify-center items-center">
      {/* Countdown Display */}
      {countdown !== null && (
        <View className="absolute z-20 bg-black/70 rounded-full w-20 h-20 justify-center items-center">
          <Text className="text-white text-4xl font-bold">{countdown}</Text>
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
); 