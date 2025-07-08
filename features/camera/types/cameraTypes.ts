export interface CameraState {
  isCapturing: boolean;
  cameraReady: boolean;
  countdown: number | null;
  permission: any; // Camera permission state
}

export interface CameraConfig {
  quality: number;
  base64: boolean;
  skipProcessing: boolean;
}

export interface CameraDimensions {
  width: number;
  height: number;
  isTablet: boolean;
}

export interface CameraOverlayProps {
  countdown: number | null;
  isTablet: boolean;
  onCancelCountdown: () => void;
}

export interface CameraControlsProps {
  cameraReady: boolean;
  isCapturing: boolean;
  countdown: number | null;
  onTakePicture: () => void;
  onStartCountdown: () => void;
  onCancelCountdown: () => void;
  isTablet: boolean;
}

export type CameraMode = 'face' | 'id';

export interface CameraCaptureResult {
  uri: string;
  filename: string;
  timestamp: string;
} 