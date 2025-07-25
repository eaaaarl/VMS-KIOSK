import React from 'react';
import { Text, View } from 'react-native';

interface IDCameraOverlayProps {
  isTablet: boolean;
  cardWidth: number;
  cardHeight: number;
  headerHeight: number;
  countdown: number | null;
}

export const IDCameraOverlay: React.FC<IDCameraOverlayProps> = ({
  isTablet,
  cardWidth,
  cardHeight,
  headerHeight,
  countdown,
}) => {
  return (
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

        {/* ID Card Frame */}
        <View
          className={`rounded-lg border-2 border-dashed bg-transparent ${countdown !== null ? 'border-yellow-400' : 'border-white'}`}
          style={{
            width: cardWidth,
            height: cardHeight,
          }}
        >
          {/* Top instruction */}
          <View className="absolute left-0 right-0" style={{ top: isTablet ? -60 : -48 }}>
            <Text
              className={`text-center font-medium text-white ${isTablet ? 'text-lg' : 'text-sm'}`}
            >
              {countdown !== null ? 'Get Ready!' : 'Align ID within the frame'}
            </Text>
          </View>

          {/* Bottom instruction */}
          <View className="absolute left-0 right-0" style={{ bottom: isTablet ? -40 : -32 }}>
            <Text
              className={`text-center text-white opacity-80 ${isTablet ? 'text-base' : 'text-xs'}`}
            >
              Ensure all text is clear and readable
            </Text>
          </View>
        </View>

        {/* Corner brackets for ID card */}
        <View className="absolute" style={{ width: cardWidth, height: cardHeight }}>
          {/* Top-left bracket */}
          <View className="absolute left-0 top-0">
            <View className={`bg-yellow-400 ${isTablet ? 'h-1 w-8' : 'h-0.5 w-6'}`} />
            <View className={`bg-yellow-400 ${isTablet ? 'h-8 w-1' : 'h-6 w-0.5'}`} />
          </View>

          {/* Top-right bracket */}
          <View className="absolute right-0 top-0">
            <View className={`bg-yellow-400 ${isTablet ? 'h-1 w-8' : 'h-0.5 w-6'}`} />
            <View className={`ml-auto bg-yellow-400 ${isTablet ? 'h-8 w-1' : 'h-6 w-0.5'}`} />
          </View>

          {/* Bottom-left bracket */}
          <View className="absolute bottom-0 left-0">
            <View className={`bg-yellow-400 ${isTablet ? 'h-8 w-1' : 'h-6 w-0.5'}`} />
            <View className={`bg-yellow-400 ${isTablet ? 'h-1 w-8' : 'h-0.5 w-6'}`} />
          </View>

          {/* Bottom-right bracket */}
          <View className="absolute bottom-0 right-0">
            <View className={`ml-auto bg-yellow-400 ${isTablet ? 'h-8 w-1' : 'h-6 w-0.5'}`} />
            <View className={`bg-yellow-400 ${isTablet ? 'h-1 w-8' : 'h-0.5 w-6'}`} />
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
              marginHorizontal: isTablet ? 40 : 30,
            }}
          />

          {/* Vertical center line */}
          <View
            className="absolute bottom-0 top-0 bg-white opacity-30"
            style={{
              left: cardWidth / 2 - 0.5,
              width: 1,
              marginVertical: isTablet ? 30 : 20,
            }}
          />
        </View>
      </View>
    </View>
  );
};
