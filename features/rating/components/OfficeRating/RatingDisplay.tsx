import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface RatingDisplayProps {
  currentAnswer: { rating: number; comment: string };
  enabledRatingType: boolean;
  onStarPress: (rating: number) => void;
  questionType?: number;
  questionName?: string;
}

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

export const RatingDisplay: React.FC<RatingDisplayProps> = ({
  currentAnswer,
  enabledRatingType,
  onStarPress,
  questionType = 0,
  questionName,
}) => {
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
            onPress={() => onStarPress(rating)}
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
          onPress={() => onStarPress(starNumber)}
          className="p-2"
          activeOpacity={0.7}
        >
          <Text className={`text-6xl ${isSelected ? 'text-yellow-400' : 'text-gray-300'}`}>★</Text>
        </TouchableOpacity>
      );
    });
  };

  if (questionType === 0) {
    return (
      <View
        className="mb-8 rounded-2xl p-8 shadow-lg"
        style={{ backgroundColor: getRatingTypeColor(questionType) }}
      >
        <View className="flex-row items-center justify-between">
          {/* Left Side - Office Info */}
          <View className="flex-1">
            <Text className="mb-2 text-3xl font-bold text-white">{questionName}</Text>
            <Text className="text-xl text-white opacity-80">Office</Text>
          </View>

          {/* Right Side - Star Rating */}
          <View className="flex-row items-center">{renderStars()}</View>
        </View>
      </View>
    );
  }

  return (
    <View className="mb-8 rounded-2xl bg-white p-8 shadow-lg">
      <View className="items-center">
        <Text className="mb-4 text-2xl font-bold text-gray-800">{questionName}</Text>
        <View className="flex-row items-center justify-center">
          {renderStars()}
        </View>
      </View>
    </View>
  );
}; 