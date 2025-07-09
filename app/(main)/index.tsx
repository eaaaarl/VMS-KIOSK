import { MainIndexUI, useMainIndex } from "@/features/main";

export default function Index() {
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