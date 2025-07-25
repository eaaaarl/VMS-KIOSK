import { MainIndexUI, useMainIndex } from '@/features/main';
import { useAppInitialization } from '@/features/main/hooks/useAppInitialization';
import { Image, View } from 'react-native';


export default function Index() {
  const { isInitialized } = useAppInitialization();

  const {
    isLandscape,
    kioskSettingId,
    isInformationModalOpen,
    setIsInformationModalOpen,
    handleReturnAllVisitors,
    isSigningOutAllVisitors,
    handleSignInPress,
    handleSignOutPress,
    handleSettingsPress,
  } = useMainIndex();

  // Show loading state while app is initializing
  if (!isInitialized) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Image
          source={require('@/assets/icons/adaptive-icon-box.png')}
          style={{ width: 200, height: 200 }}
        />
      </View>
    );
  }

  return (
    <MainIndexUI
      isLandscape={isLandscape}
      kioskSettingId={kioskSettingId}
      isInformationModalOpen={isInformationModalOpen}
      isSigningOutAllVisitors={isSigningOutAllVisitors}
      onSignInPress={handleSignInPress}
      onSignOutPress={handleSignOutPress}
      onSettingsPress={handleSettingsPress}
      onCloseModal={() => setIsInformationModalOpen(false)}
      onConfirmModal={handleReturnAllVisitors}
    />
  );
}
