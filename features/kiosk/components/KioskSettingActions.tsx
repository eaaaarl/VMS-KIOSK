import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

type KioskSettingActionsProps = {
  onCancel: () => void
  onSave: () => void
  isSaveEnabled: boolean
}

export const KioskSettingActions: React.FC<KioskSettingActionsProps> = ({
  onCancel,
  onSave,
  isSaveEnabled
}) => {
  return (
    <View className="mt-6 flex-row justify-between items-center">
      <TouchableOpacity
        onPress={onCancel}
        className="bg-gray-500 px-6 py-3 rounded-lg"
      >
        <Text className="text-white font-semibold text-lg">Cancel</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onSave}
        className={`px-8 py-3 rounded-lg ${isSaveEnabled ? 'bg-blue-500' : 'bg-gray-300'
          }`}
        disabled={!isSaveEnabled}
      >
        <Text className={`font-semibold text-lg ${isSaveEnabled ? 'text-white' : 'text-gray-500'
          }`}>
          Save
        </Text>
      </TouchableOpacity>
    </View>
  )
} 