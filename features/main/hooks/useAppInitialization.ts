import { useAppSelector } from '@/lib/redux/hook';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

export const useAppInitialization = () => {
  const router = useRouter();
  const { ipAddress, port } = useAppSelector(state => state.config);
  const { kioskSettingId } = useAppSelector(state => state.kiosk);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Step 1: Check if config is set (IP address and port)
    if (!ipAddress || ipAddress === '' || !port || port === 0) {
      console.log('Config not set, redirecting to developer settings');
      router.replace('/(developer)/setting');
      return;
    }

    // Step 2: If config is set, check if kiosk setting is configured
    if (!kioskSettingId) {
      console.log('Kiosk setting not configured, redirecting to kiosk settings');
      router.replace('/(setting)/SettingKiosk');
      return;
    }

    // Step 3: If both config and kiosk are set, app is ready
    console.log('App initialized successfully');
    setIsInitialized(true);
  }, [ipAddress, port, kioskSettingId, router]);

  return {
    isInitialized,
    ipAddress,
    port,
    kioskSettingId,
  };
};
