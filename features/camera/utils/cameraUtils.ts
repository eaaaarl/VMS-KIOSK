import { Dimensions } from 'react-native';
import { CameraConfig, CameraDimensions } from '../types/cameraTypes';

export const getCameraDimensions = (): CameraDimensions => {
  const { width, height } = Dimensions.get('window');
  const isTablet = width >= 768 || height >= 1024;
  
  return {
    width,
    height,
    isTablet
  };
};

export const getResponsiveDimensions = (isTablet: boolean) => {
  const { width, height } = Dimensions.get('window');
  
  return {
    // Face camera dimensions
    ovalWidth: isTablet ? Math.min(width * 0.4, 350) : 250,
    ovalHeight: isTablet ? Math.min(height * 0.45, 450) : 320,
    
    // ID camera dimensions
    cardWidth: isTablet ? Math.min(width * 0.6, 400) : 300,
    cardHeight: (isTablet ? Math.min(width * 0.6, 400) : 300) * 0.63, // Standard ID card ratio
    
    // Common dimensions
    headerHeight: isTablet ? 80 : 60,
    bottomPadding: isTablet ? 40 : 20,
  };
};

export const getDefaultCameraConfig = (): CameraConfig => ({
  quality: 0.8,
  base64: false,
  skipProcessing: false,
});

export const generateTimestamp = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  return `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`;
};

export const generateFilename = (mode: 'face' | 'id', timestamp: string): string => {
  return `${mode}_${timestamp}.png`;
}; 