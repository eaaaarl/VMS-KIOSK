import { Text, View } from "react-native";

export interface MainHeaderProps {
  isLandscape: boolean;
}

export const MainHeader: React.FC<MainHeaderProps> = ({ isLandscape }) => {
  return (
    <View className={`mb-12 items-center`}>
      <Text className={`text-gray-700 text-2xl font-light mb-1 tracking-wide`}>
        Welcome to
      </Text>
      <Text className={`text-gray-700 text-3xl font-bold text-center tracking-wide`}>
        Visitors Management System
      </Text>
    </View>
  );
}; 