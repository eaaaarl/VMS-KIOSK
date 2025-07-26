import React from 'react';
import { TouchableOpacity, View } from 'react-native';

interface QuestionDotsProps {
  questions: any[];
  currentQuestion: number;
  isSubmitting: boolean;
  onQuestionSelect: (index: number) => void;
}

export const QuestionDots: React.FC<QuestionDotsProps> = ({
  questions,
  currentQuestion,
  isSubmitting,
  onQuestionSelect,
}) => {
  return (
    <View className="flex-row justify-center gap-3">
      {questions.map((_: any, index: number) => (
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