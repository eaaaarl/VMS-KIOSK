import VisitorInformationModal from '@/features/kiosk/components/VisitorInformation';
import { SafeAreaView, View } from 'react-native';
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
      <View className="flex-1 justify-center px-3">
        <MainHeader isLandscape={isLandscape} />

        <ActionButtonsContainer
          isLandscape={isLandscape}
          kioskSettingId={kioskSettingId}
          onSignInPress={onSignInPress}
          onSignOutPress={onSignOutPress}
        />

        <SettingsButton onPress={onSettingsPress} />
      </View>

      <VisitorInformationModal
        isOpen={isInformationModalOpen}
        onClose={onCloseModal}
        onConfirm={onConfirmModal}
      />

    </SafeAreaView>
  );
};
