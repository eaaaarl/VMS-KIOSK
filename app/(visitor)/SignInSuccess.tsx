import EscPosEncoder from '@manhnd/esc-pos-encoder';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import RNBluetoothClassic from 'react-native-bluetooth-classic';

export default function SignInSuccess() {
  const { ticketNumber, visitorName } = useLocalSearchParams();
  const [isPrinting, setIsPrinting] = useState(false);
  const [printStatus, setPrintStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const getConnectedDevice = async () => {
    try {
      const devices = await RNBluetoothClassic.getConnectedDevices();
      return devices.length > 0 ? devices[0] : null;
    } catch (error) {
      console.error("Error getting connected device:", error);
      return null;
    }
  };

  useEffect(() => {
    const printTicket = async () => {
      if (!ticketNumber) {
        console.warn("No ticket number provided");
        return;
      }

      setIsPrinting(true);
      setPrintStatus('idle');

      try {
        const encoder = new EscPosEncoder();
        const connectedDevice = await getConnectedDevice();

        if (!connectedDevice) {
          throw new Error("No Bluetooth printer connected");
        }

        const result = encoder
          .initialize()
          .align('center')
          .qrcode(ticketNumber as string, 2, 8, 'l')
          .newline()
          .line(ticketNumber as string)
          .line('Thank you for visiting!')
          .newline()
          .line('- - - - - - - - - - - - - - - - - - - - ')
          .newline()
          .encode();

        const base64Data = btoa(
          String.fromCharCode(...new Uint8Array(result))
        );

        await RNBluetoothClassic.writeToDevice(
          connectedDevice.address,
          base64Data,
          "base64"
        );

        setPrintStatus('success');
        console.log("Ticket printed successfully");
      } catch (error) {
        console.error("Error printing ticket:", error);
        setPrintStatus('error');
        Alert.alert(
          "Printing Error",
          "Failed to print ticket. Please contact support.",
          [{ text: "OK" }]
        );
      } finally {
        setIsPrinting(false);
      }
    };

    printTicket();
  }, [ticketNumber]); // Removed visitorName from dependencies since it's not used in printing

  const handleDone = () => {
    router.replace('/(main)');
  };

  const getStatusMessage = () => {
    if (isPrinting) return "Printing ticket...";
    if (printStatus === 'success') return "Ticket printed successfully!";
    if (printStatus === 'error') return "Printing failed";
    return "Please claim your ticket!";
  };

  const getStatusColor = () => {
    if (isPrinting) return "text-blue-500";
    if (printStatus === 'success') return "text-green-500";
    if (printStatus === 'error') return "text-red-500";
    return "text-gray-600";
  };

  return (
    <View className="flex-1 bg-white px-6 py-12 justify-center items-center">
      <Text className="text-4xl font-bold text-green-500 text-center mb-6">
        Signed In Successfully!
      </Text>

      <Text className={`text-lg ${getStatusColor()} text-center mb-12`}>
        {getStatusMessage()}
      </Text>

      <Text className="text-6xl font-bold text-blue-500 text-center mb-6">
        {ticketNumber}
      </Text>

      <Text className="text-xl font-semibold text-gray-700 text-center mb-16">
        {visitorName}
      </Text>

      <TouchableOpacity
        onPress={handleDone}
        className="bg-blue-500 px-12 py-4 rounded-full shadow-lg"
        activeOpacity={0.8}
        disabled={isPrinting}
      >
        <Text className="text-white text-lg font-semibold">
          {isPrinting ? "Printing..." : "Done"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}