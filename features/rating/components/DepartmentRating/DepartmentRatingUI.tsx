import React from 'react';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ActionButtons } from './ActionButtons';
import { CommentSection } from './CommentSection';
import { ProgressBar } from './ProgressBar';
import { QuestionDots } from './QuestionDots';
import { RatingCard } from './RatingCard';

interface DepartmentRatingUIProps {
  currentQuestion: number;
  currentQ: any;
  currentAnswer: { rating: number; comment: string };
  totalQuestions: number;
  isSubmitting: boolean;
  enabledRequireComment: boolean;
  enabledRatingType: boolean;
  filteredQuestions: any[];
  progressWidth: string;
  progressPercentage: number;
  onStarPress: (rating: number) => void;
  onCommentChange: (comment: string) => void;
  onBack: () => void;
  onNext: () => void;
  onQuestionSelect: (index: number) => void;
  getRatingTypeColor: (type: number) => string;
}

export const DepartmentRatingUI: React.FC<DepartmentRatingUIProps> = ({
  currentQuestion,
  currentQ,
  currentAnswer,
  totalQuestions,
  isSubmitting,
  enabledRequireComment,
  enabledRatingType,
  filteredQuestions,
  progressWidth,
  progressPercentage,
  onStarPress,
  onCommentChange,
  onBack,
  onNext,
  onQuestionSelect,
  getRatingTypeColor,
}) => {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 px-8 py-6">
          <ProgressBar
            currentQuestion={currentQuestion}
            totalQuestions={totalQuestions}
            progressWidth={progressWidth}
            progressPercentage={progressPercentage}
          />

          <RatingCard
            question={currentQ}
            currentAnswer={currentAnswer}
            enabledRatingType={enabledRatingType}
            onStarPress={onStarPress}
            getRatingTypeColor={getRatingTypeColor}
          />

          <CommentSection
            comment={currentAnswer.comment}
            enabledRequireComment={enabledRequireComment}
            onCommentChange={onCommentChange}
          />

          <ActionButtons
            currentQuestion={currentQuestion}
            totalQuestions={totalQuestions}
            isSubmitting={isSubmitting}
            onBack={onBack}
            onNext={onNext}
          />

          <QuestionDots
            questions={filteredQuestions}
            currentQuestion={currentQuestion}
            isSubmitting={isSubmitting}
            onQuestionSelect={onQuestionSelect}
          />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}; 