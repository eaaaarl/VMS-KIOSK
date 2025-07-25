import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import type { BluetoothDevice } from 'react-native-bluetooth-classic';

interface BluetoothControlsProps {
  isBluetoothEnabled: boolean;
  isScanning: boolean;
  isConnecting: boolean;
  connectedDevice: BluetoothDevice | null;
  onEnableBluetooth: () => void;
  onStartDiscovery: () => void;
  onDisconnect: () => void;
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
  <View className="mb-4 rounded-lg bg-white p-4 shadow-sm">
    <Text className="mb-3 text-lg font-semibold">Bluetooth Controls</Text>
    {!isBluetoothEnabled && (
      <TouchableOpacity onPress={onEnableBluetooth} className="mb-2 rounded-lg bg-blue-500 p-3">
        <Text className="text-center font-semibold text-white">Enable Bluetooth</Text>
      </TouchableOpacity>
    )}
    <TouchableOpacity
      onPress={onStartDiscovery}
      disabled={!isBluetoothEnabled || isScanning}
      className={`mb-2 rounded-lg p-3 ${!isBluetoothEnabled || isScanning ? 'bg-gray-300' : 'bg-green-500'}`}
    >
      <Text className="text-center font-semibold text-white">
        {isScanning ? 'Scanning...' : 'Discover Devices'}
      </Text>
    </TouchableOpacity>
    {connectedDevice && (
      <TouchableOpacity
        onPress={onDisconnect}
        disabled={isConnecting}
        className="rounded-lg bg-red-500 p-3"
      >
        <Text className="text-center font-semibold text-white">Disconnect</Text>
      </TouchableOpacity>
    )}
  </View>
);
