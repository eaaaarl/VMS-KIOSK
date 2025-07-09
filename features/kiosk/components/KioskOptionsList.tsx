import React from 'react'
import { Text, View } from 'react-native'
import { KioskOptionItem } from './KioskOptionItem'

type KioskOption = {
  id: number
  name: string
  strTransactionType: string
}

type KioskOptionsListProps = {
  options: KioskOption[]
  selectedOptionId: number | null
  onOptionSelect: (optionId: number) => void
}

export const KioskOptionsList: React.FC<KioskOptionsListProps> = ({
  options,
  selectedOptionId,
  onOptionSelect
}) => {
  if (options.length === 0) {
    return (
      <View className="py-8 items-center">
        <Text className="text-gray-500 text-lg">Loading kiosk settings...</Text>
      </View>
    )
  }

  return (
    <>
      {options.map((option, index) => (
        <KioskOptionItem
          key={option.id}
          option={option}
          isSelected={selectedOptionId === option.id}
          isLast={index === options.length - 1}
          onSelect={onOptionSelect}
        />
      ))}
    </>
  )
} 