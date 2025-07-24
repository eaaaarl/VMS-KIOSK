import { useConfig } from '@/features/config/hooks/useConfig';
import { BarcodeScanningResult, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';
import Toast from 'react-native-toast-message';
import {
  useLazyGetVisitorLogInfoForSignOutQuery,
  useSignOutVisitorMutation,
} from '../api/visitorApi';
import { formattedDateTimeWithSpace } from '../utils/FormattedDate';

export function useSignOutVisitor() {
  const [permission, requestPermission] = useCameraPermissions();
  const [ticketNumber, setTicketNumber] = useState('');
  const [cameraActive, setCameraActive] = useState(false);
  const [error, setError] = useState('');
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [isSigningOut, setIsSigningOut] = useState(false);

  // RTK Query
  const [getVisitorLogInfoForSignOut] = useLazyGetVisitorLogInfoForSignOutQuery();

  // RTK Mutation
  const [signOutVisitor] = useSignOutVisitorMutation();

  const { enabledRequireRating } = useConfig();

  useEffect(() => {
    if (cameraActive) {
      const animateScanning = () => {
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]).start(() => {
          if (cameraActive) {
            animateScanning();
          }
        });
      };
      animateScanning();
    }
  }, [cameraActive, animatedValue]);

  const handleBarCodeScanned = (scanResult: BarcodeScanningResult) => {
    setTicketNumber(scanResult.data);
    setCameraActive(false);
    setError('');
    handleSignOut(scanResult.data);
  };

  const toggleCamera = () => {
    setCameraActive(!cameraActive);
    if (error) {
      setError('');
    }
  };

  const handleTicketNumberChange = (text: string) => {
    setTicketNumber(text);
    if (error) {
      setError('');
    }
  };

  const handleSignOut = async (scannedTicketNumber?: string) => {
    const ticket = ticketNumber || scannedTicketNumber;
    console.log('ticket:', ticket);
    if (!ticket) {
      setError('Please scan a QR code or enter ticket number');
      return;
    }
    setIsSigningOut(true);
    try {
      const checkResult = await getVisitorLogInfoForSignOut({ strId: ticket }).unwrap();

      if (!checkResult.results || checkResult.results.length === 0) {
        setError('Ticket number not found');
        setIsSigningOut(false);
        return;
      }
      const visitorInfo = checkResult.results?.[0];

      await signOutVisitor({
        strId: ticket,
        dateNow: visitorInfo.strLogIn,
        logOut: formattedDateTimeWithSpace(new Date()),
      }).unwrap();

      setTicketNumber('');
      setIsSigningOut(false);
      if (enabledRequireRating) {
        router.replace({
          pathname: '/(rating)/RatingScreen',
          params: {
            ticketNumber: ticket,
            name: visitorInfo.name,
            logIn: visitorInfo.strLogIn,
            visitorId: visitorInfo.visitorId,
          },
        });
        return;
      }
    } catch (error: any) {
      console.log('error:', error);
      setIsSigningOut(false);
      Toast.show({
        type: 'error',
        text1: 'Failed to sign out',
        text2: 'Please try again',
      });
    }
  };

  return {
    permission,
    requestPermission,
    ticketNumber,
    setTicketNumber,
    cameraActive,
    setCameraActive,
    error,
    setError,
    animatedValue,
    isSigningOut,
    handleBarCodeScanned,
    toggleCamera,
    handleTicketNumberChange,
    handleSignOut,
  };
}
