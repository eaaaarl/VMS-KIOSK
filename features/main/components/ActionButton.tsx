import { Text, TouchableOpacity, View } from 'react-native';

export interface ActionButtonProps {
  title: string;
  subtitle: string;
  icon: string;
  iconBgColor: string;
  buttonBgColor: string;
  onPress: () => void;
  isLandscape: boolean;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  title,
  subtitle,
  icon,
  iconBgColor,
  buttonBgColor,
  onPress,
  isLandscape,
}) => {
  return (
    <TouchableOpacity
      className={`flex-1 border border-gray-300 py-5 ${buttonBgColor} max-w-[320px] items-center rounded-2xl transition-transform active:scale-95 active:bg-white/80`}
      onPress={onPress}
    >
      <View
        className={`${isLandscape ? 'h-16 w-16' : 'h-20 w-20'} ${iconBgColor} items-center justify-center rounded-xl ${isLandscape ? 'mb-3' : 'mb-6'}`}
      >
        <View
          className={`h-8 w-8 ${iconBgColor.replace('100', '500')} items-center justify-center rounded`}
        >
          <Text className="text-lg text-white">{icon}</Text>
        </View>
      </View>

      <Text
        className={`text-gray-800 ${isLandscape ? 'text-2xl' : 'text-2xl'} mb-2 font-bold tracking-wide`}
      >
        {title}
      </Text>
      <Text className={`text-center text-base text-gray-600`}>{subtitle}</Text>
    </TouchableOpacity>
  );
};
