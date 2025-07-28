import React from 'react';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActionButtons } from './ActionButtons';
import { CommentInput } from './CommentInput';
import { LoadingOverlay } from './LoadingOverlay';
import { ProgressBar } from './ProgressBar';
import { QuestionDots } from './QuestionDots';
import { RatingDisplay } from './RatingDisplay';

interface OfficeRatingUIProps {
  // State
  currentQuestion: number;
  currentQ: any;
  currentAnswer: { rating: number; comment: string };
  totalQuestions: number;
  ratingQuestion: any;
  isLoading: boolean;
  isSubmitting: boolean;
  enabledRequireComment: boolean;
  enabledRatingType: boolean;

  // Handlers
  handleStarPress: (rating: number) => void;
  handleCommentChange: (comment: string) => void;
  handleBack: () => void;
  handleNext: () => void;
  handleQuestionSelect: (index: number) => void;

  // Utilities
  getProgressWidth: () => string;
  getProgressPercentage: () => number;
}

export const OfficeRatingUI: React.FC<OfficeRatingUIProps> = ({
  // State
  currentQuestion,
  currentQ,
  currentAnswer,
  totalQuestions,
  ratingQuestion,
  isLoading,
  isSubmitting,
  enabledRequireComment,
  enabledRatingType,

  // Handlers
  handleStarPress,
  handleCommentChange,
  handleBack,
  handleNext,
  handleQuestionSelect,

  // Utilities
  getProgressWidth,
  getProgressPercentage,
}) => {
  if (isLoading || !ratingQuestion?.results) {
    return <LoadingOverlay />;
  }

  const hasCommentError = enabledRequireComment && !currentAnswer.comment.trim();

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 px-8 py-6">
          {/* Progress Bar */}
          <ProgressBar
            currentQuestion={currentQuestion}
            totalQuestions={totalQuestions}
            progressWidth={getProgressWidth()}
            progressPercentage={getProgressPercentage()}
          />

          {/* Rating Card */}
          <RatingDisplay
            currentAnswer={currentAnswer}
            enabledRatingType={enabledRatingType}
            onStarPress={handleStarPress}
            questionType={currentQ?.type}
            questionName={currentQ?.name}
          />

          {/* Comment Section */}
          <CommentInput
            value={currentAnswer.comment}
            onChangeText={handleCommentChange}
            enabledRequireComment={enabledRequireComment}
            hasError={hasCommentError}
          />

          {/* Action Buttons */}
          <ActionButtons
            currentQuestion={currentQuestion}
            totalQuestions={totalQuestions}
            isSubmitting={isSubmitting}
            onBack={handleBack}
            onNext={handleNext}
          />

          {/* Question Dots Indicator */}
          <QuestionDots
            totalQuestions={totalQuestions}
            currentQuestion={currentQuestion}
            isSubmitting={isSubmitting}
            onQuestionSelect={handleQuestionSelect}
          />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};
