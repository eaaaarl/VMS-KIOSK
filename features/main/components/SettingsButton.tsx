import { Text, TouchableOpacity } from 'react-native';

export interface SettingsButtonProps {
  onPress: () => void;
}

export const SettingsButton: React.FC<SettingsButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      className={`absolute bottom-16 right-10 h-14 w-14 items-center justify-center rounded-full bg-white/30 backdrop-blur-sm active:bg-white/40`}
      onPress={onPress}
    >
      <Text className={`text-4xl text-white`}>⚙️</Text>
    </TouchableOpacity>
  );
};
