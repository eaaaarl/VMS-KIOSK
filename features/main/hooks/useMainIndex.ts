import { useVisitorsReturnedModal } from '@/features/visitors/hooks/useVisitorsReturned';
import { useAppSelector } from '@/lib/redux/hook';
import { useRouter } from 'expo-router';
import { useWindowDimensions } from 'react-native';

export interface UseMainIndexReturn {
  router: ReturnType<typeof useRouter>;
  isLandscape: boolean;
  kioskSettingId: number | null;
  isInformationModalOpen: boolean;
  setIsInformationModalOpen: (open: boolean) => void;
  handleReturnAllVisitors: () => Promise<void>;
  isSigningOutAllVisitors: boolean;
  handleSignInPress: () => void;
  handleSignOutPress: () => void;
  handleSettingsPress: () => void;
}

export const useMainIndex = (): UseMainIndexReturn => {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const { kioskSettingId } = useAppSelector(state => state.kiosk);

  const {
    isInformationModalOpen,
    setIsInformationModalOpen,
    handleReturnAllVisitors,
    isSigningOutAllVisitors,
  } = useVisitorsReturnedModal();

  const handleSignInPress = () => {
    router.push('/(visitor)/VisitorRegistrationScreen');
  };

  const handleSignOutPress = () => {
    router.push('/(visitor)/SignOutScreen');
  };

  const handleSettingsPress = () => {
    router.push('/(user)/UserConfirmationScreen');
  };

  return {
    router,
    isLandscape,
    kioskSettingId,
    isInformationModalOpen,
    setIsInformationModalOpen,
    handleReturnAllVisitors,
    isSigningOutAllVisitors,
    handleSignInPress,
    handleSignOutPress,
    handleSettingsPress,
  };
};
