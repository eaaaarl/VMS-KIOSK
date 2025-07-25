import { getCameraDimensions, getResponsiveDimensions } from '../utils/cameraUtils';
import { useCamera } from './useCamera';

export const useIDCameraScreen = () => {
  const { isTablet } = getCameraDimensions();
  const { cardWidth, cardHeight, headerHeight, bottomPadding } = getResponsiveDimensions(isTablet);

  const {
    cameraRef,
    cameraState,
    permission,
    requestPermission,
    handleCameraReady,
    startCountdown,
    cancelCountdown,
  } = useCamera('id');

  return {
    isTablet,
    cardWidth,
    cardHeight,
    headerHeight,
    bottomPadding,
    cameraRef,
    cameraState,
    permission,
    requestPermission,
    handleCameraReady,
    startCountdown,
    cancelCountdown,
  };
};
