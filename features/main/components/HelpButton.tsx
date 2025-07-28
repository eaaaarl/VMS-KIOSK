import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as WebBrowser from 'expo-web-browser';
import { Pressable, Text, View } from 'react-native';

interface HelpButtonProps {
  videoUrl: string;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  className?: string;
  showLabel?: boolean;
  color?: string;
  labelBgHelpColor?: string;
  labelTextBgColor?: string;
}

export const HelpButton: React.FC<HelpButtonProps> = ({
  videoUrl,
  position = 'top-right',
  className = '',
  showLabel = true,
  color = 'bg-blue-500',
  labelBgHelpColor = 'bg-white',
  labelTextBgColor = 'text-blue-600',
}) => {
  const handleHelpPress = async () => {
    try {
      await WebBrowser.openBrowserAsync(videoUrl);
    } catch (error) {
      console.error('Error opening help video:', error);
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'top-right':
        return 'top-2 right-2 ';
      case 'top-left':
        return 'top-0 -left-4';
      case 'bottom-right':
        return 'bottom-0 -right-4';
      case 'bottom-left':
        return 'bottom-0 -left-4';
      default:
        return 'top-0 -right-4';
    }
  };

  return (
    <View className={`absolute ${getPositionClasses()} ${className}`}>
      <View className="flex-col items-center">
        {showLabel && (
          <View className={`absolute -top-8 mb-1 w-24`}>
            <View
              className={`rounded-md border border-gray-300 bg-white px-2 py-1 shadow-sm ${labelBgHelpColor}`}
              style={{ elevation: 2 }}
            >
              <Text className={`${labelTextBgColor} text-center text-xs font-medium`}>
                Need Help?
              </Text>
            </View>
          </View>
        )}

        <Pressable
          onPress={handleHelpPress}
          className={`h-10 w-10 items-center justify-center rounded-full ${color} shadow-lg`}
          style={{
            elevation: 4,
            shadowColor: '#3B82F6',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
          }}
        >
          <FontAwesome name="info" size={20} color="#FFFFFF" />
        </Pressable>
      </View>
    </View>
  );
};
