import { View } from "react-native";
import { UIActivityIndicator } from "react-native-indicators";

export interface LoadingOverlayProps {
  isLoading: boolean;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <View
        style={{
          backgroundColor: 'rgba(0,0,0,0.5)',
          borderRadius: 12,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 13,
          minWidth: 50,
          minHeight: 50,
        }}
      >
        <UIActivityIndicator key="loading-indicator" color="#fff" size={30} />
      </View>
    </View>
  );
}; 