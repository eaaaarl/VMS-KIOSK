import { getCameraDimensions, getResponsiveDimensions } from '../utils/cameraUtils';
import { useCamera } from './useCamera';

export const useFaceCameraScreen = () => {
  const { isTablet } = getCameraDimensions();
  const { ovalWidth, ovalHeight, headerHeight, bottomPadding } = getResponsiveDimensions(isTablet);

  const {
    cameraRef,
    cameraState,
    permission,
    requestPermission,
    handleCameraReady,
    startCountdown,
    cancelCountdown,
    takePicture,
  } = useCamera('face');

  return {
    isTablet,
    ovalWidth,
    ovalHeight,
    headerHeight,
    bottomPadding,
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
