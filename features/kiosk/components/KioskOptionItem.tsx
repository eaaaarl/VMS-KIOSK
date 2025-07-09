import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

type KioskOption = {
  id: number
  name: string
  strTransactionType: string
}

type KioskOptionItemProps = {
  option: KioskOption
  isSelected: boolean
  isLast: boolean
  onSelect: (optionId: number) => void
}

export const KioskOptionItem: React.FC<KioskOptionItemProps> = ({
  option,
  isSelected,
  isLast,
  onSelect
}) => {
  return (
    <TouchableOpacity
      onPress={() => onSelect(option.id)}
      className={`flex-row py-4 px-4 items-center ${!isLast ? 'border-b border-gray-200' : ''
        } ${isSelected ? 'bg-blue-50' : 'bg-white'}`}
    >
      <View className="w-12 items-center">
        <View className={`w-5 h-5 border-2 rounded ${isSelected
          ? 'bg-blue-500 border-blue-500'
          : 'border-gray-400'
          } items-center justify-center`}>
          {isSelected && (
            <Text className="text-white text-xs font-bold">✓</Text>
          )}
        </View>
      </View>

      <View className="flex-1">
        <Text className="text-gray-800 text-base">{option.name}</Text>
      </View>

      <View className="flex-1">
        <Text className="text-gray-600 text-base">{option.strTransactionType}</Text>
      </View>
    </TouchableOpacity>
  )
} 