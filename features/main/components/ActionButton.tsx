import { Text, TouchableOpacity, View } from "react-native";

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
      className={`flex-1 py-5 border border-gray-300 ${buttonBgColor} rounded-2xl items-center max-w-[320px] active:bg-white/80 active:scale-95 transition-transform`}
      onPress={onPress}
    >
      <View className={`${isLandscape ? 'w-16 h-16' : 'w-20 h-20'} ${iconBgColor} rounded-xl items-center justify-center ${isLandscape ? 'mb-3' : 'mb-6'}`}>
        <View className={`w-8 h-8 ${iconBgColor.replace('100', '500')} rounded items-center justify-center`}>
          <Text className="text-white text-lg">{icon}</Text>
        </View>
      </View>

      <Text className={`text-gray-800 ${isLandscape ? 'text-2xl' : 'text-2xl'} font-bold mb-2 tracking-wide`}>
        {title}
      </Text>
      <Text className={`text-gray-600 text-center text-base`}>
        {subtitle}
      </Text>
    </TouchableOpacity>
  );
}; 