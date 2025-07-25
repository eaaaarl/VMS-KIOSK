import { useConfig } from '@/features/config/hooks/useConfig';
import {
  RatingSubmitPayload,
  useLazyGetRatingQuestionQuery,
  useSubmitRatingMutation,
} from '@/features/rating/api/ratingApi';
import { format, parse } from 'date-fns';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type AnswerType = {
  rating: number;
  comment: string;
};

type AnswersType = {
  [key: number]: AnswerType;
};

const getRatingTypeColor = (type: number): string => {
  const colorMap: { [key: number]: string } = {
    1: '#3B82F6', // blue
    2: '#10B981', // green
    3: '#8B5CF6', // purple
    4: '#F97316', // orange
    5: '#EF4444', // red
  };
  return colorMap[type] || '#3B82F6'; // default to blue
};

export default function OfficeRating() {
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

  const renderStars = () => {
    if (enabledRatingType) {
      // Render smileys
      return Array.from({ length: 5 }, (_, index) => {
        const rating = index + 1;
        const isSelected = rating <= currentAnswer.rating;
        let smiley = '😐'; // neutral

        if (rating === 1)
          smiley = '😡'; // very angry
        else if (rating === 2)
          smiley = '😕'; // sad
        else if (rating === 3)
          smiley = '😐'; // neutral
        else if (rating === 4)
          smiley = '🙂'; // happy
        else if (rating === 5) smiley = '😄'; // very happy

        return (
          <TouchableOpacity
            key={rating}
            onPress={() => handleStarPress(rating)}
            className="p-2"
            activeOpacity={0.7}
          >
            <Text className={`text-6xl ${isSelected ? 'opacity-100' : 'opacity-40'}`}>
              {smiley}
            </Text>
          </TouchableOpacity>
        );
      });
    }

    // Default star rating
    return Array.from({ length: 5 }, (_, index) => {
      const starNumber = index + 1;
      const isSelected = starNumber <= currentAnswer.rating;

      return (
        <TouchableOpacity
          key={starNumber}
          onPress={() => handleStarPress(starNumber)}
          className="p-2"
          activeOpacity={0.7}
        >
          <Text className={`text-6xl ${isSelected ? 'text-yellow-400' : 'text-gray-300'}`}>★</Text>
        </TouchableOpacity>
      );
    });
  };

  const getProgressWidth = () => {
    const progress = totalQuestions > 0 ? ((currentQuestion + 1) / totalQuestions) * 100 : 0;
    return `${progress}%`;
  };

  const getProgressPercentage = () => {
    return totalQuestions > 0 ? Math.round(((currentQuestion + 1) / totalQuestions) * 100) : 0;
  };

  if (isLoading || !ratingQuestion?.results) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-gray-50">
        <Text className="text-xl text-gray-600">Loading questions...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 px-8 py-6">
          {/* Progress Bar */}
          <View className="mb-6">
            <View className="mb-3 flex-row items-center justify-between">
              <Text className="text-lg font-semibold text-gray-600">
                Question {currentQuestion + 1} of {totalQuestions}
              </Text>
              <Text className="text-base text-gray-500">{getProgressPercentage()}% Complete</Text>
            </View>
            <View className="h-2 w-full rounded-full bg-gray-200">
              <View
                className="h-full rounded-full bg-blue-500"
                style={{ width: getProgressWidth() as any }}
              />
            </View>
          </View>

          {/* Rating Card */}
          <View
            className="mb-8 rounded-2xl p-8 shadow-lg"
            style={{ backgroundColor: currentQ ? getRatingTypeColor(currentQ.type) : '#3B82F6' }}
          >
            <View className="flex-row items-center justify-between">
              {/* Left Side - Office Info */}
              <View className="flex-1">
                <Text className="mb-2 text-3xl font-bold text-white">{currentQ?.name}</Text>
                <Text className="text-xl text-white opacity-80">Question {currentQ?.type}</Text>
              </View>

              {/* Right Side - Star Rating */}
              <View className="flex-row items-center">{renderStars()}</View>
            </View>
          </View>

          {/* Comment Section */}
          <View className="mb-8 flex-1">
            <TextInput
              value={currentAnswer.comment}
              onChangeText={handleCommentChange}
              placeholder={enabledRequireComment ? 'Comment (Required)' : 'Optional Comment'}
              placeholderTextColor="#9CA3AF"
              multiline
              textAlignVertical="top"
              className={`flex-1 rounded-2xl border bg-white p-6 text-lg text-gray-700 ${enabledRequireComment && !currentAnswer.comment.trim() ? 'border-red-400' : 'border-gray-200'} shadow-sm`}
              style={{
                minHeight: 100,
                maxHeight: 150,
              }}
            />
            {enabledRequireComment && !currentAnswer.comment.trim() && (
              <Text className="ml-2 mt-2 text-red-500">
                Please provide a comment before proceeding
              </Text>
            )}
          </View>

          {/* Action Buttons */}
          <View className="mb-6 flex-row items-center justify-between">
            {/* Back Button */}
            <TouchableOpacity
              onPress={handleBack}
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
              onPress={handleNext}
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

          {/* Question Dots Indicator */}
          <View className="flex-row justify-center gap-3">
            {ratingQuestion.results.map((_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setCurrentQuestion(index)}
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
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
