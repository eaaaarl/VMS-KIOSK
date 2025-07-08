import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import type { BluetoothDevice } from 'react-native-bluetooth-classic'

interface BluetoothControlsProps {
  isBluetoothEnabled: boolean
  isScanning: boolean
  isConnecting: boolean
  connectedDevice: BluetoothDevice | null
  onEnableBluetooth: () => void
  onStartDiscovery: () => void
  onDisconnect: () => void
}

export const BluetoothControls: React.FC<BluetoothControlsProps> = ({
  isBluetoothEnabled,
  isScanning,
  isConnecting,
  connectedDevice,
  onEnableBluetooth,
  onStartDiscovery,
  onDisconnect,
}) => (
  <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
    <Text className="text-lg font-semibold mb-3">Bluetooth Controls</Text>
    {!isBluetoothEnabled && (
      <TouchableOpacity
        onPress={onEnableBluetooth}
        className="bg-blue-500 p-3 rounded-lg mb-2"
      >
        <Text className="text-white text-center font-semibold">Enable Bluetooth</Text>
      </TouchableOpacity>
    )}
    <TouchableOpacity
      onPress={onStartDiscovery}
      disabled={!isBluetoothEnabled || isScanning}
      className={`p-3 rounded-lg mb-2 ${!isBluetoothEnabled || isScanning ? 'bg-gray-300' : 'bg-green-500'}`}
    >
      <Text className="text-white text-center font-semibold">
        {isScanning ? 'Scanning...' : 'Discover Devices'}
      </Text>
    </TouchableOpacity>
    {connectedDevice && (
      <TouchableOpacity
        onPress={onDisconnect}
        disabled={isConnecting}
        className="bg-red-500 p-3 rounded-lg"
      >
        <Text className="text-white text-center font-semibold">Disconnect</Text>
      </TouchableOpacity>
    )}
  </View>
) 