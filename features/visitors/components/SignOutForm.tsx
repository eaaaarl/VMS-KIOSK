import { BarcodeScanningResult, CameraView } from 'expo-camera';
import React from 'react';
import {
  Animated,
  Keyboard,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

interface SignOutFormProps {
  permission: any;
  requestPermission: () => void;
  ticketNumber: string;
  cameraActive: boolean;
  error: string;
  animatedValue: Animated.Value;
  isSigningOut: boolean;
  handleBarCodeScanned: (scanResult: BarcodeScanningResult) => void;
  toggleCamera: () => void;
  handleTicketNumberChange: (text: string) => void;
  handleSignOut: () => void;
  handleBack: () => void;
}

export const SignOutForm: React.FC<SignOutFormProps> = ({
  permission,
  requestPermission,
  ticketNumber,
  cameraActive,
  error,
  animatedValue,
  isSigningOut,
  handleBarCodeScanned,
  toggleCamera,
  handleTicketNumberChange,
  handleSignOut,
  handleBack,
}) => {
  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 items-center justify-center bg-black px-6">
        <Text className="mb-4 text-center text-lg text-white">
          We need your permission to show the camera
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          className="rounded-full bg-yellow-400 px-6 py-3"
        >
          <Text className="font-semibold text-black">Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 bg-white bg-gradient-to-br from-blue-400 to-blue-600">
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 px-8 pt-6">
            <View className="mb-6">
              <Text className="text-center text-3xl font-bold text-gray-800">Sign Out</Text>
            </View>
            <View className="mb-6 flex-row gap-8">
              <View className="flex-1">
                <TouchableOpacity
                  onPress={toggleCamera}
                  className="h-96 items-center justify-center overflow-hidden rounded-lg bg-gray-900"
                >
                  {cameraActive ? (
                    <View className="h-full w-full">
                      <CameraView
                        style={{ flex: 1 }}
                        onBarcodeScanned={handleBarCodeScanned}
                        barcodeScannerSettings={{
                          barcodeTypes: ['qr'],
                        }}
                        facing="front"
                      />
                      <View className="absolute inset-0 flex items-center justify-center">
                        <View className="relative h-48 w-48 border-2 border-white border-opacity-50">
                          <View className="absolute left-0 top-0 h-6 w-6 border-l-4 border-t-4 border-yellow-400" />
                          <View className="absolute right-0 top-0 h-6 w-6 border-r-4 border-t-4 border-yellow-400" />
                          <View className="absolute bottom-0 left-0 h-6 w-6 border-b-4 border-l-4 border-yellow-400" />
                          <View className="absolute bottom-0 right-0 h-6 w-6 border-b-4 border-r-4 border-yellow-400" />
                        </View>
                        <Text className="mt-4 rounded bg-black bg-opacity-50 px-3 py-1 text-sm text-white">
                          Position QR code within frame
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <View className="items-center">
                      <View className="mb-4 h-16 w-16 items-center justify-center rounded-lg border-2 border-gray-500">
                        <View className="h-8 w-8 border-2 border-gray-500" />
                      </View>
                      <Text className="text-base text-gray-400">QR Code Scanner</Text>
                      <Text className="mt-1 text-sm text-gray-500">Tap to scan ticket</Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
              <View className="flex-1 justify-center">
                <View className="mb-8">
                  <Text className="mb-4 text-center text-lg font-semibold text-gray-700">
                    Enter Ticket Number
                  </Text>
                  <TextInput
                    className={`border bg-white ${error ? 'border-red-500' : 'border-gray-200'} rounded-lg px-6 py-6 text-center text-lg shadow-sm`}
                    placeholder={error || 'Ticket Number Or Scan QR Code'}
                    placeholderTextColor={error ? '#ef4444' : 'gray'}
                    value={ticketNumber}
                    onChangeText={handleTicketNumberChange}
                    keyboardType="numeric"
                  />
                  <Text className="mt-2 text-center text-sm text-red-500">{error}</Text>
                </View>
                <View className="items-center">
                  <TouchableOpacity
                    onPress={handleSignOut}
                    className="rounded-full bg-blue-500 px-16 py-5 shadow-lg"
                    disabled={isSigningOut}
                  >
                    <Text className="text-lg font-semibold text-white">
                      {isSigningOut ? 'Signing Out...' : 'Sign Out'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <View className="absolute bottom-32 left-8 right-8">
          <TouchableOpacity
            onPress={handleBack}
            className="self-start rounded-full bg-gray-100 px-8 py-4 shadow-sm"
          >
            <Text className="text-lg font-medium text-gray-700">Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
