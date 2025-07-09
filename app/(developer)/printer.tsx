import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { BluetoothControls } from '../../features/developer/components/BluetoothControls'
import { DebugInfo } from '../../features/developer/components/DebugInfo'
import { DeviceList } from '../../features/developer/components/DeviceList'
import { PrintingControls } from '../../features/developer/components/PrintingControls'
import { useBluetoothPrinter } from '../../features/developer/hooks/useBluetoothPrinter'

export default function PrinterScreen() {
  const {
    isBluetoothEnabled,
    devices,
    connectedDevice,
    isScanning,
    isConnecting,
    debugInfo,
    enableBluetooth,
    startDiscovery,
    connectToDevice,
    disconnectDevice,
    printVisitorPass,
    printVisitorBarcode,
    printVisitorQR,
    clearDebugInfo,
  } = useBluetoothPrinter()

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      <View className="mb-6">
        <Text className="text-2xl font-bold text-gray-800 mb-2">Printer Management</Text>
        <Text className="text-sm text-gray-600">
          Bluetooth: {isBluetoothEnabled ? 'Enabled' : 'Disabled'}
        </Text>
        <Text className="text-sm text-gray-600">
          Connected: {connectedDevice ? connectedDevice.name : 'None'}
        </Text>
      </View>
      <BluetoothControls
        isBluetoothEnabled={isBluetoothEnabled}
        isScanning={isScanning}
        isConnecting={isConnecting}
        connectedDevice={connectedDevice}
        onEnableBluetooth={enableBluetooth}
        onStartDiscovery={startDiscovery}
        onDisconnect={disconnectDevice}
      />
      <DeviceList
        devices={devices}
        connectedDevice={connectedDevice}
        isConnecting={isConnecting}
        onConnect={connectToDevice}
      />
      <PrintingControls
        connected={!!connectedDevice}
        onPrintPass={printVisitorPass}
        onPrintBarcode={printVisitorBarcode}
        onPrintQR={printVisitorQR}
      />
      <DebugInfo debugInfo={debugInfo} onClear={clearDebugInfo} />
    </ScrollView>
  )
}