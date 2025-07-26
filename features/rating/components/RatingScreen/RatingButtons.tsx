import { Text, TouchableOpacity, View } from 'react-native';

interface RatingButtonsProps {
  onOfficeRating: () => void;
  onDepartmentRating: () => void;
}

export function RatingButtons({ onOfficeRating, onDepartmentRating }: RatingButtonsProps) {
  return (
    <View className="flex-1 items-center justify-center gap-8">
      {/* Office Level Rating Button */}
      <TouchableOpacity
        onPress={onOfficeRating}
        className="w-full max-w-md rounded-2xl bg-blue-500 px-8 py-6 shadow-lg active:bg-blue-600"
        activeOpacity={0.8}
      >
        <Text className="text-center text-xl font-semibold text-white">
          Office Level Rating
        </Text>
      </TouchableOpacity>

      {/* Office to Department Level Rating Button */}
      <TouchableOpacity
        onPress={onDepartmentRating}
        className="w-full max-w-md rounded-2xl bg-blue-500 px-8 py-6 shadow-lg active:bg-blue-600"
        activeOpacity={0.8}
      >
        <Text className="text-center text-xl font-semibold leading-7 text-white">
          Office to Department Level{'\n'}Rating
        </Text>
      </TouchableOpacity>
    </View>
  );
} 