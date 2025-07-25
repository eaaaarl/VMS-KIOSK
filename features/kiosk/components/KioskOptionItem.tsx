import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type KioskOption = {
  id: number;
  name: string;
  strTransactionType: string;
};

type KioskOptionItemProps = {
  option: KioskOption;
  isSelected: boolean;
  isLast: boolean;
  onSelect: (optionId: number) => void;
};

export const KioskOptionItem: React.FC<KioskOptionItemProps> = ({
  option,
  isSelected,
  isLast,
  onSelect,
}) => {
  return (
    <TouchableOpacity
      onPress={() => onSelect(option.id)}
      className={`flex-row items-center px-4 py-4 ${
        !isLast ? 'border-b border-gray-200' : ''
      } ${isSelected ? 'bg-blue-50' : 'bg-white'}`}
    >
      <View className="w-12 items-center">
        <View
          className={`h-5 w-5 rounded border-2 ${
            isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-400'
          } items-center justify-center`}
        >
          {isSelected && <Text className="text-xs font-bold text-white">✓</Text>}
        </View>
      </View>

      <View className="flex-1">
        <Text className="text-base text-gray-800">{option.name}</Text>
      </View>

      <View className="flex-1">
        <Text className="text-base text-gray-600">{option.strTransactionType}</Text>
      </View>
    </TouchableOpacity>
  );
};
