import { View } from "react-native";
import { ActionButton } from "./ActionButton";

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
    <View className={`flex-row gap-6 w-full justify-center`}>
      {kioskSettingId === 3 ? (
        <></>
      ) : (
        <ActionButton
          title="SIGN IN"
          subtitle="Register and Sign In"
          icon="👤"
          iconBgColor="bg-blue-100"
          buttonBgColor="bg-white/90"
          onPress={onSignInPress}
          isLandscape={isLandscape}
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
          onPress={onSignOutPress}
          isLandscape={isLandscape}
        />
      )}
    </View>
  );
}; 