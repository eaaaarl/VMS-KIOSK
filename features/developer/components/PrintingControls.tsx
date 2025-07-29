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
  <View className="mb-2 rounded-lg bg-white p-6 shadow-sm">
    <Text className="mb-4 text-xl font-semibold text-gray-800">Printing Tests</Text>
    <View className="gap-3">
      <TouchableOpacity
        onPress={onPrintPass}
        disabled={!connected}
        className={`rounded-lg p-4 ${!connected ? 'bg-gray-300' : 'bg-purple-500'}`}
      >
        <Text className="text-center text-lg font-semibold text-white">Print Visitor Pass</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPrintBarcode}
        disabled={!connected}
        className={`rounded-lg p-4 ${!connected ? 'bg-gray-300' : 'bg-orange-500'}`}
      >
        <Text className="text-center text-lg font-semibold text-white">Print Visitor Barcode</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPrintQR}
        disabled={!connected}
        className={`rounded-lg p-4 ${!connected ? 'bg-gray-300' : 'bg-indigo-500'}`}
      >
        <Text className="text-center text-lg font-semibold text-white">Print Visitor QR Code</Text>
      </TouchableOpacity>
    </View>
  </View>
);
