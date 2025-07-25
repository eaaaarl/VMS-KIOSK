import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type KioskSettingHeaderProps = {
  onClose: () => void;
};

export const KioskSettingHeader: React.FC<KioskSettingHeaderProps> = ({ onClose }) => {
  return (
    <View className="flex-row items-center justify-between bg-blue-500 px-6 py-4">
      <Text className="text-xl font-semibold text-white">Select a Setting for this KIOSK</Text>
      <TouchableOpacity
        onPress={onClose}
        className="h-8 w-8 items-center justify-center rounded-full bg-white/20"
      >
        <Text className="text-xl font-bold text-white">×</Text>
      </TouchableOpacity>
    </View>
  );
};
