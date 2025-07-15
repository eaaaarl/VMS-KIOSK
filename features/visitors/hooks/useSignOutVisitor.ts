import { BarcodeScanningResult, useCameraPermissions } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';
import Toast from 'react-native-toast-message';

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
    const ticket = scannedTicketNumber || ticketNumber;
    console.log('ticket:', ticket);
    /* if (!ticket) {
      setError('Please scan a QR code or enter ticket number');
      return;
    }
    setIsSigningOut(true); */
    try {
      /*  const checkResult = await reduxStore
        .dispatch(visitorApi.endpoints.checkIDNumber.initiate({ strId: ticket }))
        .unwrap();
      console.log('checkResult:', checkResult);
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
      }); */
    } catch (error: any) {
      setIsSigningOut(false);
      // Safely log error message and stack if available
      if (error instanceof Error) {
        console.log('Error:', error.message, error.stack);
      } else {
        // Fallback for non-Error objects, safely stringify
        console.log('Error:', safeStringify(error));
      }
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

// Helper for safe JSON.stringify to avoid circular structure errors
function safeStringify(obj: any) {
  const seen = new WeakSet();
  return JSON.stringify(obj, function (key, value) {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) return;
      seen.add(value);
    }
    return value;
  });
}
