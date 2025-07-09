import { Text, TouchableOpacity } from "react-native";

export interface SettingsButtonProps {
  onPress: () => void;
}

export const SettingsButton: React.FC<SettingsButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      className={`absolute bottom-16 right-10 w-14 h-14 bg-white/30 rounded-full items-center justify-center backdrop-blur-sm active:bg-white/40`}
      onPress={onPress}
    >
      <Text className={`text-white text-4xl`}>⚙️</Text>
    </TouchableOpacity>
  );
}; 