import { useCheckIDNumberQuery, useSignOutVisitorMutation } from '@/features/visitors/api/visitorApi';
import { formattedDateTimeWithSpace } from '@/features/visitors/utils/FormattedDate';
import { BarcodeScanningResult, CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Keyboard, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Toast from 'react-native-toast-message';

export default function SignOutScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [ticketNumber, setTicketNumber] = useState('');
  const [cameraActive, setCameraActive] = useState(false);
  const [error, setError] = useState('');
  const animatedValue = useRef(new Animated.Value(0)).current;
  const { data: idNumberData } = useCheckIDNumberQuery({ strId: ticketNumber }, { skip: !ticketNumber });
  const [signOutVisitor, { isLoading: isSigningOut }] = useSignOutVisitorMutation();

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
    setTicketNumber(scanResult.data);
    setCameraActive(false);
    setError('');
  };

  const handleBack = () => {
    router.push('/(main)');
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

  const handleSignOut = async () => {
    if (!ticketNumber) {
      setError("Please scan a QR code or enter ticket number");
      return;
    }

    if (idNumberData?.results.length === 0) {
      setError("Ticket number not found");
      return;
    }

    try {
      await signOutVisitor({
        strId: ticketNumber,
        dateNow: idNumberData?.results?.[0]?.strLogIn as string,
        logOut: formattedDateTimeWithSpace(new Date()),
      });

      setTicketNumber('');

      router.replace({
        pathname: '/(visitor)/SignOutSuccess',
        params: { ticketNumber, name: idNumberData?.results?.[0]?.name as string },
      });

    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Failed to sign out',
        text2: 'Please try again',
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 bg-gradient-to-br bg-white from-blue-400 to-blue-600">
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 120 }} // Extra space for navigation bar
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 px-8 pt-6">
            {/* Header */}
            <View className="mb-6">
              <Text className="text-3xl font-bold text-gray-800 text-center">
                Sign Out
              </Text>
            </View>

            {/* Main Content - Horizontal Layout for Tablet */}
            <View className="flex-row gap-8 mb-6">
              {/* Camera Section */}
              <View className="flex-1">
                <TouchableOpacity
                  onPress={toggleCamera}
                  className="bg-gray-900 rounded-lg h-96 items-center justify-center overflow-hidden"
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
                        <View className="w-48 h-48 border-2 border-white border-opacity-50 relative">
                          <View className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-yellow-400" />
                          <View className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-yellow-400" />
                          <View className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-yellow-400" />
                          <View className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-yellow-400" />
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
                      <Text className="text-gray-400 text-base">QR Code Scanner</Text>
                      <Text className="text-gray-500 text-sm mt-1">Tap to scan ticket</Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>

              {/* Input and Button Section */}
              <View className="flex-1 justify-center">
                <View className="mb-8">
                  <Text className="text-lg font-semibold text-gray-700 mb-4 text-center">
                    Enter Ticket Number
                  </Text>
                  <TextInput
                    className={`bg-white border ${error ? 'border-red-500' : 'border-gray-200'} rounded-lg px-6 py-6 text-lg text-center shadow-sm`}
                    placeholder={error || "Ticket Number Or Scan QR Code"}
                    placeholderTextColor={error ? "#ef4444" : "gray"}
                    value={ticketNumber}
                    onChangeText={handleTicketNumberChange}
                    keyboardType="default"
                  />
                </View>

                <View className="items-center">
                  <TouchableOpacity
                    onPress={handleSignOut}
                    className="bg-blue-500 rounded-full py-5 px-16 shadow-lg"
                    disabled={isSigningOut}
                  >
                    <Text className="text-white text-lg font-semibold">
                      {isSigningOut ? "Signing Out..." : "Sign Out"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Fixed Back Button */}
        <View className="absolute bottom-32 left-8 right-8">
          <TouchableOpacity
            onPress={handleBack}
            className="bg-gray-100 rounded-full py-4 px-8 self-start shadow-sm"
          >
            <Text className="text-gray-700 text-lg font-medium">
              Back
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}