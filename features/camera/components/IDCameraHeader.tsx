import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface IDCameraHeaderProps {
  isTablet: boolean;
  headerHeight: number;
  onClose: () => void;
}

export const IDCameraHeader: React.FC<IDCameraHeaderProps> = ({
  isTablet,
  headerHeight,
  onClose,
}) => {
  return (
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
          onPress={onClose}
        >
          <Ionicons name="close" size={isTablet ? 32 : 24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}; 