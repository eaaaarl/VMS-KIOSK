import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface PrintingControlsProps {
  connected: boolean;
  onPrintPass: () => void;
  onPrintBarcode: () => void;
  onPrintQR: () => void;
}

export const PrintingControls: React.FC<PrintingControlsProps> = ({
  connected,
  onPrintPass,
  onPrintBarcode,
  onPrintQR,
}) => (
  <View className="mb-4 rounded-lg bg-white p-4 shadow-sm">
    <Text className="mb-3 text-lg font-semibold">Printing Tests</Text>
    <TouchableOpacity
      onPress={onPrintPass}
      disabled={!connected}
      className={`mb-2 rounded-lg p-3 ${!connected ? 'bg-gray-300' : 'bg-purple-500'}`}
    >
      <Text className="text-center font-semibold text-white">Print Visitor Pass</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={onPrintBarcode}
      disabled={!connected}
      className={`mb-2 rounded-lg p-3 ${!connected ? 'bg-gray-300' : 'bg-orange-500'}`}
    >
      <Text className="text-center font-semibold text-white">Print Visitor Barcode</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={onPrintQR}
      disabled={!connected}
      className={`rounded-lg p-3 ${!connected ? 'bg-gray-300' : 'bg-indigo-500'}`}
    >
      <Text className="text-center font-semibold text-white">Print Visitor QR Code</Text>
    </TouchableOpacity>
  </View>
);
