import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface FaceCameraHeaderProps {
  isTablet: boolean;
  headerHeight: number;
  onClose: () => void;
}

export const FaceCameraHeader: React.FC<FaceCameraHeaderProps> = ({
  isTablet,
  headerHeight,
  onClose,
}) => (
  <View
    className="absolute left-0 right-0 top-0 z-10 bg-red-500 px-4"
    style={{ paddingTop: isTablet ? 20 : 48, paddingBottom: 16, height: headerHeight }}
  >
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center">
        <Ionicons name="person-outline" size={isTablet ? 32 : 24} color="white" />
        <Text className={`ml-3 font-semibold text-white ${isTablet ? 'text-2xl' : 'text-lg'}`}>
          Capture Face
        </Text>
      </View>
      <TouchableOpacity className={`p-2 ${isTablet ? 'p-3' : 'p-1'}`} onPress={onClose}>
        <Ionicons name="close" size={isTablet ? 32 : 24} color="white" />
      </TouchableOpacity>
    </View>
  </View>
);
