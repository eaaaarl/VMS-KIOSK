import { store as reduxStore } from '@/lib/redux/store';
import { BarcodeScanningResult, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';
import Toast from 'react-native-toast-message';
import { visitorApi } from '../api/visitorApi';
import { formattedDateTimeWithSpace } from '../utils/FormattedDate';

export function useSignOutVisitor() {
  const [permission, requestPermission] = useCameraPermissions();
  const [ticketNumber, setTicketNumber] = useState('');
  const [cameraActive, setCameraActive] = useState(false);
  const [error, setError] = useState('');
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [isSigningOut, setIsSigningOut] = useState(false);

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
      const checkResult = await reduxStore
        .dispatch(visitorApi.endpoints.getVisitorLogInfoForSignOut.initiate({ strId: ticket }))
        .unwrap();

      if (!checkResult.results || checkResult.results.length === 0) {
        setError('Ticket number not found');
        setIsSigningOut(false);
        return;
      }
      const visitorInfo = checkResult.results?.[0];

      await reduxStore
        .dispatch(
          visitorApi.endpoints.signOutVisitor.initiate({
            strId: ticket,
            dateNow: visitorInfo.strLogIn,
            logOut: formattedDateTimeWithSpace(new Date()),
          })
        )
        .unwrap();
      setTicketNumber('');
      setIsSigningOut(false);
      router.replace({
        pathname: '/(visitor)/SignOutSuccess',
        params: { ticketNumber: ticket, name: visitorInfo.name },
      });
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
