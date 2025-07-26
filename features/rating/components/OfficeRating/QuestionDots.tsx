import React from 'react';
import { TouchableOpacity, View } from 'react-native';

interface QuestionDotsProps {
  totalQuestions: number;
  currentQuestion: number;
  isSubmitting: boolean;
  onQuestionSelect: (index: number) => void;
}

export const QuestionDots: React.FC<QuestionDotsProps> = ({
  totalQuestions,
  currentQuestion,
  isSubmitting,
  onQuestionSelect,
}) => {
  return (
    <View className="flex-row justify-center gap-3">
      {Array.from({ length: totalQuestions }, (_, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onQuestionSelect(index)}
          disabled={isSubmitting}
          activeOpacity={0.7}
        >
          <View
            className={`h-3 w-3 rounded-full ${index === currentQuestion ? 'bg-blue-500' : index < currentQuestion ? 'bg-green-500' : 'bg-gray-300'}`}
            style={{
              transform: index === currentQuestion ? [{ scale: 1.3 }] : [{ scale: 1 }],
            }}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}; 