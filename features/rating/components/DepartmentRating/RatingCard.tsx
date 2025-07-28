import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface RatingCardProps {
  question: any;
  currentAnswer: { rating: number; comment: string };
  enabledRatingType: boolean;
  onStarPress: (rating: number) => void;
  getRatingTypeColor: (type: number) => string;
}

export const RatingCard: React.FC<RatingCardProps> = ({
  question,
  currentAnswer,
  enabledRatingType,
  onStarPress,
  getRatingTypeColor,
}) => {
  const iconMap = {
    1: 'emoticon-angry',
    2: 'emoticon-sad',
    3: 'emoticon-neutral',
    4: 'emoticon-happy',
    5: 'emoticon-excited',
  } as const;

  const iconColors = {
    1: '#EF4444', // Red for angry
    2: '#F97316', // Orange for sad
    3: '#FBBF24', // Yellow for neutral
    4: '#34D399', // Green for happy
    5: '#60A5FA', // Blue for excited
  } as const;

  const renderStars = () => {
    if (enabledRatingType) {
      // Render emoji rating
      return Array.from({ length: 5 }, (_, index) => {
        const emojiRating = index + 1;

        return (
          <TouchableOpacity
            key={emojiRating}
            onPress={() => onStarPress(emojiRating)}
            className="p-2"
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons
              name={iconMap[emojiRating as keyof typeof iconMap] || 'emoticon-neutral'}
              size={48}
              color={
                emojiRating <= currentAnswer.rating
                  ? iconColors[emojiRating as keyof typeof iconColors]
                  : `${iconColors[emojiRating as keyof typeof iconColors]}30`
              }
            />
          </TouchableOpacity>
        );
      });
    }

    // Original star rating
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

  return (
    <View
      className="mb-8 rounded-2xl p-8 shadow-lg"
      style={{ backgroundColor: question ? getRatingTypeColor(question.type) : '#3B82F6' }}
    >
      <View className="flex-row items-center justify-between">
        {/* Left Side - Office Info */}
        <View className="flex-1">
          <Text className="mb-2 text-3xl font-bold text-white">{question?.name}</Text>
          <Text className="text-xl text-white opacity-80">
            {question?.type === 0 ? 'Office' : 'Department'}
          </Text>
        </View>

        {/* Right Side - Star Rating */}
        <View className="flex-row items-center">{renderStars()}</View>
      </View>
    </View>
  );
};
