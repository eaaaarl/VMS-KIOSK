import VisitorInformationModal from '@/features/kiosk/components/VisitorInformation';
import { Image, SafeAreaView, Text, View } from 'react-native';
import { ActionButtonsContainer } from './ActionButtonsContainer';
import { MainHeader } from './MainHeader';
import { SettingsButton } from './SettingsButton';

export interface MainIndexUIProps {
  isLandscape: boolean;
  kioskSettingId: number | null;
  isInformationModalOpen: boolean;
  isSigningOutAllVisitors: boolean;
  onSignInPress: () => void;
  onSignOutPress: () => void;
  onSettingsPress: () => void;
  onCloseModal: () => void;
  onConfirmModal: () => Promise<void>;
  helpVideoUrl?: string;
  ipAddress: string;
  port: number;
}

export const MainIndexUI: React.FC<MainIndexUIProps> = ({
  isLandscape,
  kioskSettingId,
  isInformationModalOpen,
  isSigningOutAllVisitors,
  onSignInPress,
  onSignOutPress,
  onSettingsPress,
  onCloseModal,
  onConfirmModal,
  helpVideoUrl,
  ipAddress,
  port,
}) => {
  const url = `http://${ipAddress}:${port}/uploads/company/bg_logo_transparent.png`;
  return (
    <SafeAreaView className="flex-1 bg-gradient-to-br from-blue-400 to-blue-600">
      <Image
        source={{ uri: url }}
        className="absolute w-full h-full opacity-5 "
        resizeMode="contain"
      />
      <View className="flex-1 justify-center px-3">
        <MainHeader isLandscape={isLandscape} />

        <ActionButtonsContainer
          isLandscape={isLandscape}
          kioskSettingId={kioskSettingId}
          onSignInPress={onSignInPress}
          onSignOutPress={onSignOutPress}
        />

        <SettingsButton onPress={onSettingsPress} />

        <View className="absolute bottom-16 left-0 right-0 flex flex-row items-center justify-between px-4">
          <View className="flex-row items-center space-x-2">
            <Image
              source={require('@/assets/images/icon.png')}
              className="w-4 h-4"
              resizeMode="contain"
            />
            <Text className="text-gray-700 text-xs font-medium ">
              Powered by <Text className="font-bold">GHOVEN APP WORLD</Text>
            </Text>
          </View>
        </View>
      </View>

      <VisitorInformationModal
        isOpen={isInformationModalOpen}
        onClose={onCloseModal}
        onConfirm={onConfirmModal}
      />
    </SafeAreaView>
  );
};
