import { useConfig } from '@/features/config/hooks/useConfig';
import EscPosEncoder from '@manhnd/esc-pos-encoder';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import RNBluetoothClassic from 'react-native-bluetooth-classic';

export type PrintStatus = 'idle' | 'success' | 'error';

export const useSignInSuccess = () => {
  const { enabledPrintTicket } = useConfig();
  const { ticketNumber, visitorName } = useLocalSearchParams();
  const [isPrinting, setIsPrinting] = useState(false);
  const [printStatus, setPrintStatus] = useState<PrintStatus>('idle');

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
    if (!enabledPrintTicket) {
      setPrintStatus('success');
      return;
    }

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
          // No printer found, skip printing and set as success
          setPrintStatus('success');
          return;
        }

        const result = encoder
          .initialize()
          .align('center')
          .qrcode(ticketNumber as string, 2, 8, 'l')
          .newline()
          .line(ticketNumber as string)
          .line('Thank you for visiting!')
          .newline()
          .line('- - - - - - - - - - - - - - - - - - - - - - - - -')
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
      } catch (error) {
        console.log("Error printing ticket:", error);
        setPrintStatus('error');
      } finally {
        setIsPrinting(false);
      }
    };

    printTicket();
  }, [ticketNumber, enabledPrintTicket]);

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

  return {
    ticketNumber: ticketNumber as string,
    visitorName: visitorName as string,
    isPrinting,
    printStatus,
    handleDone,
    getStatusMessage,
    getStatusColor,
  };
}; 