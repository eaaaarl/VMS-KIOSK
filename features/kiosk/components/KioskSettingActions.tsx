import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type KioskSettingActionsProps = {
  onCancel: () => void;
  onSave: () => void;
  isSaveEnabled: boolean;
};

export const KioskSettingActions: React.FC<KioskSettingActionsProps> = ({
  onCancel,
  onSave,
  isSaveEnabled,
}) => {
  return (
    <View className="mt-6 flex-row items-center justify-between">
      <TouchableOpacity onPress={onCancel} className="rounded-lg bg-gray-500 px-6 py-3">
        <Text className="text-lg font-semibold text-white">Cancel</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onSave}
        className={`rounded-lg px-8 py-3 ${isSaveEnabled ? 'bg-blue-500' : 'bg-gray-300'}`}
        disabled={!isSaveEnabled}
      >
        <Text className={`text-lg font-semibold ${isSaveEnabled ? 'text-white' : 'text-gray-500'}`}>
          Save
        </Text>
      </TouchableOpacity>
    </View>
  );
};
