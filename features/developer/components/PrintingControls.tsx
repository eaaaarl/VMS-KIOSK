import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

interface PrintingControlsProps {
  connected: boolean
  onPrintPass: () => void
  onPrintBarcode: () => void
  onPrintQR: () => void
}

export const PrintingControls: React.FC<PrintingControlsProps> = ({
  connected,
  onPrintPass,
  onPrintBarcode,
  onPrintQR,
}) => (
  <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
    <Text className="text-lg font-semibold mb-3">Printing Tests</Text>
    <TouchableOpacity
      onPress={onPrintPass}
      disabled={!connected}
      className={`p-3 rounded-lg mb-2 ${!connected ? 'bg-gray-300' : 'bg-purple-500'}`}
    >
      <Text className="text-white text-center font-semibold">Print Visitor Pass</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={onPrintBarcode}
      disabled={!connected}
      className={`p-3 rounded-lg mb-2 ${!connected ? 'bg-gray-300' : 'bg-orange-500'}`}
    >
      <Text className="text-white text-center font-semibold">Print Visitor Barcode</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={onPrintQR}
      disabled={!connected}
      className={`p-3 rounded-lg ${!connected ? 'bg-gray-300' : 'bg-indigo-500'}`}
    >
      <Text className="text-white text-center font-semibold">Print Visitor QR Code</Text>
    </TouchableOpacity>
  </View>
) 