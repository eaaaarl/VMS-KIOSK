import { useConfig } from '@/features/config/hooks/useConfig';
import {
    RatingSubmitPayload,
    useLazyGetRatingQuestionQuery,
    useSubmitRatingMutation,
} from '@/features/rating/api/ratingApi';
import { format, parse } from 'date-fns';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

interface AnswerType {
  rating: number;
  comment: string;
}

interface AnswersType {
  [key: number]: AnswerType;
}

export const useOfficeRatingScreen = () => {
  const { logIn, ticketNumber, visitorId } = useLocalSearchParams();
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [getRatingQuestion, { data: ratingQuestion, isLoading }] = useLazyGetRatingQuestionQuery();
  const [submitRating, { isLoading: isSubmitting }] = useSubmitRatingMutation();
  const [answers, setAnswers] = useState<AnswersType>({});

  const loginDate = format(new Date(logIn as string), 'yyyy-MM-dd');
  const loginDateTime = format(
    parse(logIn as string, 'yyyy-MM-dd HH:mm:ss', new Date()),
    'yyyy-MM-dd HH:mm:ss'
  );

  const { enabledRequireComment, enabledRatingType } = useConfig();

  useEffect(() => {
    getRatingQuestion({
      logIn: loginDate,
      strId: ticketNumber as string,
      visitorId: visitorId as string,
    });
  }, [loginDate, ticketNumber, visitorId, getRatingQuestion]);

  useEffect(() => {
    if (ratingQuestion?.results) {
      const initialAnswers = ratingQuestion.results.reduce((acc, _, index) => {
        acc[index] = { rating: 5, comment: '' };
        return acc;
      }, {} as AnswersType);
      setAnswers(initialAnswers);
    }
  }, [ratingQuestion?.results]);

  const currentQ = ratingQuestion?.results[currentQuestion];
  const currentAnswer = answers[currentQuestion] || { rating: 5, comment: '' };
  const totalQuestions = ratingQuestion?.results?.length ?? 0;

  const handleStarPress = (rating: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: { ...prev[currentQuestion], rating },
    }));
  };

  const handleCommentChange = (comment: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: { ...prev[currentQuestion], comment },
    }));
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleNext = async () => {
    if (enabledRequireComment && !currentAnswer.comment.trim()) {
      alert('Please provide a comment before proceeding.');
      return;
    }

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      try {
        const submissionData: RatingSubmitPayload = {
          ratings: ratingQuestion!.results.map((q, index) => ({
            id: ticketNumber as string,
            logIn: loginDateTime,
            type: q.type,
            name: q.name,
            rating: answers[index].rating,
            comment: answers[index].comment,
          })),
        };

        await submitRating(submissionData).unwrap();
        router.replace('/(rating)/SuccessRatingScreen');
      } catch (error) {
        console.error('Failed to submit ratings:', error);
        alert('Failed to submit ratings. Please try again.');
      }
    }
  };

  const handleQuestionSelect = (index: number) => {
    setCurrentQuestion(index);
  };

  const getProgressWidth = () => {
    const progress = totalQuestions > 0 ? ((currentQuestion + 1) / totalQuestions) * 100 : 0;
    return `${progress}%`;
  };

  const getProgressPercentage = () => {
    return totalQuestions > 0 ? Math.round(((currentQuestion + 1) / totalQuestions) * 100) : 0;
  };

  return {
    // State
    currentQuestion,
    currentQ,
    currentAnswer,
    totalQuestions,
    ratingQuestion,
    isLoading,
    isSubmitting,
    answers,
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
  };
}; 