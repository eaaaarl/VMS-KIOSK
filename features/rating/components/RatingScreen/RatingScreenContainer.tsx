import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RatingButtons } from './RatingButtons';
import { RatingHeader } from './RatingHeader';

interface RatingScreenContainerProps {
  name: string;
  messageFeedback?: string;
  message?: string;
  onOfficeRating: () => void;
  onDepartmentRating: () => void;
}

export function RatingScreenContainer({
  name,
  messageFeedback,
  message,
  onOfficeRating,
  onDepartmentRating,
}: RatingScreenContainerProps) {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 px-8 py-12">
        <RatingHeader name={name} messageFeedback={messageFeedback} message={message} />

        <RatingButtons onOfficeRating={onOfficeRating} onDepartmentRating={onDepartmentRating} />

        {/* Bottom Spacer */}
        <View className="h-16" />
      </View>
    </SafeAreaView>
  );
}
