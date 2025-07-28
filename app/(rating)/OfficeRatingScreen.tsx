import { OfficeRatingUI, useOfficeRatingScreen } from '@/features/rating';
import React from 'react';

export default function OfficeRating() {
  const {
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
  } = useOfficeRatingScreen();

  return (
    <OfficeRatingUI
      // State
      currentQuestion={currentQuestion}
      currentQ={currentQ}
      currentAnswer={currentAnswer}
      totalQuestions={totalQuestions}
      ratingQuestion={ratingQuestion}
      isLoading={isLoading}
      isSubmitting={isSubmitting}
      enabledRequireComment={enabledRequireComment}
      enabledRatingType={enabledRatingType}
      // Handlers
      handleStarPress={handleStarPress}
      handleCommentChange={handleCommentChange}
      handleBack={handleBack}
      handleNext={handleNext}
      handleQuestionSelect={handleQuestionSelect}
      // Utilities
      getProgressWidth={getProgressWidth}
      getProgressPercentage={getProgressPercentage}
    />
  );
}
