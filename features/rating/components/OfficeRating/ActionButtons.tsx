import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface ActionButtonsProps {
  currentQuestion: number;
  totalQuestions: number;
  isSubmitting: boolean;
  onBack: () => void;
  onNext: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  currentQuestion,
  totalQuestions,
  isSubmitting,
  onBack,
  onNext,
}) => {
  return (
    <View className="mb-6 flex-row items-center justify-between">
      {/* Back Button */}
      <TouchableOpacity
        onPress={onBack}
        disabled={currentQuestion === 0 || isSubmitting}
        className={`rounded-full px-8 py-4 shadow-sm ${currentQuestion === 0 ? 'bg-gray-200' : 'border-2 border-gray-300 bg-white'}`}
        activeOpacity={currentQuestion === 0 ? 1 : 0.8}
      >
        <Text
          className={`text-xl font-semibold ${currentQuestion === 0 ? 'text-gray-400' : 'text-gray-700'}`}
        >
          Back
        </Text>
      </TouchableOpacity>

      {/* Next/Submit Button */}
      <TouchableOpacity
        onPress={onNext}
        disabled={isSubmitting}
        className={`rounded-full px-12 py-4 shadow-lg ${isSubmitting ? 'bg-gray-400' : 'bg-blue-500 active:bg-blue-600'}`}
        activeOpacity={0.8}
      >
        <Text className="text-xl font-semibold text-white">
          {isSubmitting
            ? 'Submitting...'
            : currentQuestion === totalQuestions - 1
              ? 'Submit'
              : 'Next'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
