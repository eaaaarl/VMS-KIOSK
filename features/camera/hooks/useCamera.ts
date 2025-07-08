import { setCardImageId, setFaceImageId } from '@/lib/redux/state/visitorSlice';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { CameraCaptureResult, CameraMode, CameraState } from '../types/cameraTypes';
import { generateFilename, generateTimestamp, getDefaultCameraConfig } from '../utils/cameraUtils';

export const useCamera = (mode: CameraMode) => {
  const dispatch = useDispatch();
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  const [cameraState, setCameraState] = useState<CameraState>({
    isCapturing: false,
    cameraReady: false,
    countdown: null,
    permission,
  });

  // Update permission in state when it changes
  useEffect(() => {
    setCameraState(prev => ({ ...prev, permission }));
  }, [permission]);

  // Countdown timer effect
  useEffect(() => {
    let timer: any;
    if (cameraState.countdown && cameraState.countdown > 0) {
      timer = setTimeout(() => {
        setCameraState(prev => ({ ...prev, countdown: prev.countdown! - 1 }));
      }, 1000);
    } else if (cameraState.countdown === 0) {
      takePicture();
      setCameraState(prev => ({ ...prev, countdown: null }));
    }
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cameraState.countdown]);

  const handleCameraReady = () => {
    setCameraState(prev => ({ ...prev, cameraReady: true }));
  };

  const startCountdown = () => {
    if (cameraState.cameraReady && !cameraState.isCapturing) {
      setCameraState(prev => ({ ...prev, countdown: 3 }));
    }
  };

  const cancelCountdown = () => {
    setCameraState(prev => ({ ...prev, countdown: null }));
  };

  const takePicture = async (): Promise<CameraCaptureResult | null> => {
    if (cameraRef.current && cameraState.cameraReady && !cameraState.isCapturing) {
      try {
        setCameraState(prev => ({ ...prev, isCapturing: true }));

        const photo = await cameraRef.current.takePictureAsync(getDefaultCameraConfig());
        const timestamp = generateTimestamp();
        const filename = generateFilename(mode, timestamp);
        const fileUri = `${FileSystem.cacheDirectory}${filename}`;

        await FileSystem.moveAsync({
          from: photo.uri,
          to: fileUri,
        });

        // Dispatch to Redux based on mode
        if (mode === 'face') {
          dispatch(setFaceImageId({ faceImageId: filename }));
        } else {
          dispatch(setCardImageId({ cardImageId: filename }));
        }

        router.replace('/(visitor)/SignInScreen');

        return {
          uri: fileUri,
          filename,
          timestamp,
        };
      } catch (error) {
        console.error('Error taking picture:', error);
        Alert.alert('Error', 'Failed to capture photo. Please try again.');
        return null;
      } finally {
        setCameraState(prev => ({ ...prev, isCapturing: false }));
      }
    }
    return null;
  };

  return {
    cameraRef,
    cameraState,
    permission,
    requestPermission,
    handleCameraReady,
    startCountdown,
    cancelCountdown,
    takePicture,
  };
};
