import React from 'react';
import { Text, View } from 'react-native';

interface ProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
  progressWidth: string;
  progressPercentage: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentQuestion,
  totalQuestions,
  progressWidth,
  progressPercentage,
}) => {
  return (
    <View className="mb-6">
      <View className="mb-3 flex-row items-center justify-between">
        <Text className="text-lg font-semibold text-gray-600">
          Question {currentQuestion + 1} of {totalQuestions}
        </Text>
        <Text className="text-base text-gray-500">{progressPercentage}% Complete</Text>
      </View>
      <View className="h-2 w-full rounded-full bg-gray-200">
        <View className="h-full rounded-full bg-blue-500" style={{ width: progressWidth as any }} />
      </View>
    </View>
  );
};
