import { View } from 'react-native';
import { ActionButton } from './ActionButton';

export interface ActionButtonsContainerProps {
  isLandscape: boolean;
  kioskSettingId: number | null;
  onSignInPress: () => void;
  onSignOutPress: () => void;
}

export const ActionButtonsContainer: React.FC<ActionButtonsContainerProps> = ({
  isLandscape,
  kioskSettingId,
  onSignInPress,
  onSignOutPress,
}) => {
  return (
    <View className={`w-full flex-row justify-center gap-6`}>
      {kioskSettingId === 3 ? (
        <></>
      ) : (
        <ActionButton
          title="SIGN IN"
          subtitle="Register and Sign In"
          icon="👤"
          iconBgColor="bg-blue-100"
          buttonBgColor="bg-white/90"
          buttonBgHelpColor="bg-blue-500"
          labelBgHelpColor="bg-blue-500"
          labelTextBgHelpColor="text-blue-500"
          onPress={onSignInPress}
          isLandscape={isLandscape}
          helpVideoUrl="https://www.youtube.com/watch?v=dTrBa2hqWoU" // Replace with actual help video URL
        />
      )}

      {kioskSettingId === 2 ? (
        <></>
      ) : (
        <ActionButton
          title="SIGN OUT"
          subtitle="Sign Out Properly"
          icon="🚪"
          iconBgColor="bg-green-100"
          buttonBgColor="bg-white/90"
          buttonBgHelpColor="bg-green-500"
          labelBgHelpColor="bg-green-500"
          labelTextBgHelpColor="text-green-500"
          onPress={onSignOutPress}
          isLandscape={isLandscape}
          helpVideoUrl="https://www.youtube.com/watch?v=cqVaD4RFEVk" // Replace with actual help video URL
        />
      )}
    </View>
  );
};
