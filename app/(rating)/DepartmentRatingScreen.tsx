import React from 'react';

import { DepartmentRatingUI, useDepartmentRatingScreen } from '@/features/rating';

export default function DepartmentRating() {
  const {
    currentQuestion,
    currentQ,
    currentAnswer,
    totalQuestions,
    isSubmitting,
    enabledRequireComment,
    enabledRatingType,
    filteredQuestions,
    handleStarPress,
    handleCommentChange,
    handleBack,
    handleNext,
    handleQuestionSelect,
    getProgressWidth,
    getProgressPercentage,
    getRatingTypeColor,
  } = useDepartmentRatingScreen();

  return (
    <DepartmentRatingUI
      currentQuestion={currentQuestion}
      currentQ={currentQ}
      currentAnswer={currentAnswer}
      totalQuestions={totalQuestions}
      isSubmitting={isSubmitting}
      enabledRequireComment={enabledRequireComment}
      enabledRatingType={enabledRatingType}
      filteredQuestions={filteredQuestions}
      progressWidth={getProgressWidth()}
      progressPercentage={getProgressPercentage()}
      onStarPress={handleStarPress}
      onCommentChange={handleCommentChange}
      onBack={handleBack}
      onNext={handleNext}
      onQuestionSelect={handleQuestionSelect}
      getRatingTypeColor={getRatingTypeColor}
    />
  );
}
