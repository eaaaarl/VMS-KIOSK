import React from 'react';
import { View } from 'react-native';
import { KioskOptionItem } from './KioskOptionItem';

type KioskOption = {
  id: number;
  name: string;
  strTransactionType: string;
};

type KioskOptionsListProps = {
  options: KioskOption[];
  selectedOptionId: number | null;
  onOptionSelect: (optionId: number) => void;
};

const LoadingSkeletonItem: React.FC<{ isLast?: boolean }> = ({ isLast }) => (
  <View className={`flex-row items-center p-4 ${!isLast ? 'border-b border-gray-200' : ''}`}>
    <View className="flex-1">
      <View className="mb-2 h-4 w-3/4 animate-pulse rounded bg-gray-300" />
      <View className="h-3 w-1/2 animate-pulse rounded bg-gray-200" />
    </View>
    <View className="h-6 w-6 animate-pulse rounded-full bg-gray-300" />
  </View>
);

export const KioskOptionsList: React.FC<KioskOptionsListProps> = ({
  options,
  selectedOptionId,
  onOptionSelect,
}) => {
  if (options.length === 0) {
    return (
      <View className="py-4">
        <LoadingSkeletonItem />
        <LoadingSkeletonItem />
        <LoadingSkeletonItem isLast />
      </View>
    );
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
  );
};
