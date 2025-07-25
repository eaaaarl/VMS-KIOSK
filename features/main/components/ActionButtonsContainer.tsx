import { View } from 'react-native';
import { BUTTON_CONFIGS } from '../constants/buttonConstants';
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
          {...BUTTON_CONFIGS.SIGN_IN}
          onPress={onSignInPress}
          isLandscape={isLandscape}
        />
      )}

      {kioskSettingId === 2 ? (
        <></>
      ) : (
        <ActionButton
          {...BUTTON_CONFIGS.SIGN_OUT}
          onPress={onSignOutPress}
          isLandscape={isLandscape}
        />
      )}
    </View>
  );
};
