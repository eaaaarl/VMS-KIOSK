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
}) => {
  return (
    <SafeAreaView className="flex-1 bg-gradient-to-br from-blue-400 to-blue-600">
      <Image
        source={require('@/assets/images/bir_logo.png')}
        className="absolute w-full h-full opacity-5"
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

        <Text className="absolute bottom-20  ml-4 self-left text-gray-700 text-xs opacity-70">
          Powered By: GHOVEN APP WORLD
        </Text>
      </View>

      <VisitorInformationModal
        isOpen={isInformationModalOpen}
        onClose={onCloseModal}
        onConfirm={onConfirmModal}
      />
    </SafeAreaView>
  );
};
