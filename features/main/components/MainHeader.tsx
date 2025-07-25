import { Text, View } from 'react-native';

export interface MainHeaderProps {
  isLandscape: boolean;
}

export const MainHeader: React.FC<MainHeaderProps> = ({ isLandscape }) => {
  return (
    <View className={`mb-12 items-center`}>
      <Text className={`mb-1 text-2xl font-light tracking-wide text-gray-700`}>Welcome to</Text>
      <Text className={`text-center text-3xl font-bold tracking-wide text-gray-700`}>
        Visitors Management System
      </Text>
    </View>
  );
};
