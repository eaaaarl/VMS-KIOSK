import { useConfig } from '@/features/config/hooks/useConfig';
import {
  RatingSubmitPayload,
  useLazyGetRatingQuestionQuery,
  useSubmitRatingMutation,
} from '@/features/rating/api/ratingApi';
import { format, parse } from 'date-fns';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

interface Rating {
  strLogIn: string;
  type: number;
  name: string;
  rating: number;
  comment: string;
}

type AnswerType = {
  rating: number;
  comment: string;
};

type AnswersType = {
  [key: number]: AnswerType;
};

export const useDepartmentRatingScreen = () => {
  const { logIn, ticketNumber, visitorId } = useLocalSearchParams();
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [getRatingQuestion, { data: ratingQuestion }] = useLazyGetRatingQuestionQuery();
  const [submitRating, { isLoading: isSubmitting }] = useSubmitRatingMutation();
  const [answers, setAnswers] = useState<AnswersType>({});
  const [filteredQuestions, setFilteredQuestions] = useState<Rating[]>([]);

  const { enabledRequireComment, enabledRatingType } = useConfig();

  const loginDate = format(new Date(logIn as string), 'yyyy-MM-dd');
  const loginDateTime = format(
    parse(logIn as string, 'yyyy-MM-dd HH:mm:ss', new Date()),
    'yyyy-MM-dd HH:mm:ss'
  );

  useEffect(() => {
    getRatingQuestion({
      logIn: loginDate,
      strId: ticketNumber as string,
      visitorId: visitorId as string,
    });
  }, [loginDate, ticketNumber, visitorId, getRatingQuestion]);

  useEffect(() => {
    if (ratingQuestion?.results) {
      // Filter questions to only include type 0 and 1
      const filtered = ratingQuestion.results.filter(q => q.type === 0 || q.type === 1);
      setFilteredQuestions(filtered as unknown as Rating[]);

      // Initialize answers for filtered questions
      const initialAnswers = filtered.reduce((acc, _, index) => {
        acc[index] = { rating: 5, comment: '' };
        return acc;
      }, {} as AnswersType);
      setAnswers(initialAnswers);
    }
  }, [ratingQuestion?.results]);

  const currentQ = filteredQuestions[currentQuestion];
  const currentAnswer = answers[currentQuestion] || { rating: 5, comment: '' };
  const totalQuestions = filteredQuestions?.length ?? 0;

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
          ratings: filteredQuestions.map((q: Rating, index: number) => ({
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

  const getRatingTypeColor = (type: number): string => {
    const colorMap: { [key: number]: string } = {
      0: '#3B82F6', // blue for type 0 (Office)
      1: '#6366F1', // indigo for department
      2: '#10B981', // greens
      3: '#8B5CF6', // purple
      4: '#F97316', // orange
      5: '#EF4444', // red
    };
    return colorMap[type] || '#3B82F6'; // default to blue
  };

  return {
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
  };
}; 