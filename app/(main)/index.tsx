import { MainIndexUI, useMainIndex } from '@/features/main';
import { useAppInitialization } from '@/features/main/hooks/useAppInitialization';
import { useAppSelector } from '@/lib/redux/hook';
import { Image, Text, View } from 'react-native';

export default function Index() {
  const { isInitialized } = useAppInitialization();
  const { ipAddress, port } = useAppSelector(state => state.config);
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
      <View className="flex-1 items-center justify-center bg-white relative">
        <Image
          source={require('@/assets/icons/adaptive-icon-box.png')}
          style={{ width: 200, height: 200 }}
        />
        <Text className="mt-4 text-gray-600 text-sm">
          Powered By: GHOVEN IT SOLUTIONS
        </Text>
      </View>
    );
  }

  return (
    <MainIndexUI
      ipAddress={ipAddress}
      port={port}
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
