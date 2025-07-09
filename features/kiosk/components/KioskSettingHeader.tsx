import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

type KioskSettingHeaderProps = {
  onClose: () => void
}

export const KioskSettingHeader: React.FC<KioskSettingHeaderProps> = ({ onClose }) => {
  return (
    <View className="bg-blue-500 px-6 py-4 flex-row justify-between items-center">
      <Text className="text-white text-xl font-semibold">Select a Setting for this KIOSK</Text>
      <TouchableOpacity
        onPress={onClose}
        className="w-8 h-8 rounded-full bg-white/20 items-center justify-center"
      >
        <Text className="text-white text-xl font-bold">×</Text>
      </TouchableOpacity>
    </View>
  )
} 