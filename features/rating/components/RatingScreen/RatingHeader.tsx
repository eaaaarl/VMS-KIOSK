import { Text, View } from 'react-native';

interface RatingHeaderProps {
  name: string;
  messageFeedback?: string;
  message?: string;
}

export function RatingHeader({ name, messageFeedback, message }: RatingHeaderProps) {
  return (
    <View className="mb-16 items-center">
      <Text className="mb-4 text-4xl font-bold text-gray-700">Rate us</Text>

      <View className="items-center">
        <Text className="mb-2 text-2xl font-semibold">
          Hi <Text className="font-bold text-blue-500">{name}</Text>!{' '}
          {messageFeedback || 'we need your feedback'}
        </Text>
        <Text className="text-center text-lg text-gray-600">
          {message || 'Please rate your experience in this visit'}
        </Text>
      </View>
    </View>
  );
}
