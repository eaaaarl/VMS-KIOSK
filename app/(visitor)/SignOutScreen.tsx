import { BarcodeScanningResult, CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Animated, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignOutScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [ticketNumber, setTicketNumber] = useState('');
  const [cameraActive, setCameraActive] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (cameraActive) {
      // Start the scanning animation
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

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 bg-black items-center justify-center px-6">
        <Text className="text-white text-lg text-center mb-4">
          We need your permission to show the camera
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          className="bg-yellow-400 rounded-full py-3 px-6"
        >
          <Text className="text-black font-semibold">Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleBarCodeScanned = (scanResult: BarcodeScanningResult) => {
    // Set the scanned QR code data as ticket number
    setTicketNumber(scanResult.data);

    // Immediately deactivate camera after successful scan
    setCameraActive(false);
  };

  const handleSignOut = () => {
    if (!ticketNumber) {
      Alert.alert("Error", "Please scan a QR code or enter ticket number");
      return;
    }
    console.log('Sign Out with ticket:', ticketNumber);
  };

  const handleBack = () => {
    router.push('/(main)')
  };

  const toggleCamera = () => {
    setCameraActive(!cameraActive);
  };

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-br bg-white from-blue-400 to-blue-600">
      <View className="flex-1 px-6 pt-8 pb-4">
        <Text className="text-2xl font-bold text-gray-800 mb-8">
          Sign Out
        </Text>

        <TouchableOpacity
          onPress={toggleCamera}
          className="bg-gray-900 rounded-lg mb-8 h-96 items-center justify-center overflow-hidden"
        >
          {cameraActive ? (
            <View className="w-full h-full">
              <CameraView
                style={{ flex: 1 }}
                onBarcodeScanned={handleBarCodeScanned}
                barcodeScannerSettings={{
                  barcodeTypes: ['qr'],
                }}
                facing='front'
              />
              <View className="absolute inset-0 flex items-center justify-center">
                {/* Scanning Box */}
                <View className="w-64 h-64 border-2 border-white border-opacity-50 relative">
                  {/* Corner indicators */}
                  <View className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-yellow-400" />
                  <View className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-yellow-400" />
                  <View className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-yellow-400" />
                  <View className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-yellow-400" />

                  {/* Animated scanning line */}
                  <Animated.View
                    className="absolute left-0 right-0 h-1 bg-yellow-400 opacity-75"
                    style={{
                      transform: [
                        {
                          translateY: animatedValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 252], // 64*4 - 4 (height of box minus line height)
                          }),
                        },
                      ],
                    }}
                  />
                </View>
                <Text className="text-white text-sm mt-4 bg-black bg-opacity-50 px-3 py-1 rounded">
                  Position QR code within frame
                </Text>
              </View>
            </View>
          ) : (
            <View className="items-center">
              <View className="w-16 h-16 border-2 border-gray-500 rounded-lg mb-4 items-center justify-center">
                <View className="w-8 h-8 border-2 border-gray-500" />
              </View>
              <Text className="text-gray-400 text-sm">QR Code Scanner</Text>
              <Text className="text-gray-500 text-xs mt-1">Tap to scan ticket</Text>
            </View>
          )}
        </TouchableOpacity>

        <View className="mb-8">
          <TextInput
            className="bg-white border border-gray-200 rounded-lg px-4 py-4 text-base text-center"
            placeholder="Ticket Number"
            value={ticketNumber}
            onChangeText={setTicketNumber}
            keyboardType="numeric"
          />
        </View>

        <View className="items-center mb-8">
          <TouchableOpacity
            onPress={handleSignOut}
            className="bg-blue-400 rounded-full py-4 px-12 shadow-sm"
          >
            <Text className="text-white text-base font-semibold">
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="px-6 py-4 bg-white border-t border-gray-100">
        <TouchableOpacity
          onPress={handleBack}
          className="bg-gray-100 rounded-full py-3 px-6 self-start"
        >
          <Text className="text-gray-700 text-base font-medium">
            Back
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}