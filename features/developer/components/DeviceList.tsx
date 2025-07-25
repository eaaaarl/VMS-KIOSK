import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import type { BluetoothDevice } from 'react-native-bluetooth-classic';

interface DeviceListProps {
  devices: BluetoothDevice[];
  connectedDevice: BluetoothDevice | null;
  isConnecting: boolean;
  onConnect: (device: BluetoothDevice) => void;
}

export const DeviceList: React.FC<DeviceListProps> = ({
  devices,
  connectedDevice,
  isConnecting,
  onConnect,
}) => (
  <View className="mb-4 rounded-lg bg-white p-4 shadow-sm">
    <Text className="mb-3 text-lg font-semibold">Available Devices</Text>
    {devices.length === 0 ? (
      <Text className="py-4 text-center text-gray-500">
        No devices found. Tap &quot;Discover Devices&quot; to scan.
      </Text>
    ) : (
      devices.map(device => (
        <TouchableOpacity
          key={device.id}
          onPress={() => onConnect(device)}
          disabled={isConnecting}
          className={`mb-2 rounded-lg border border-gray-200 p-3 ${connectedDevice?.id === device.id ? 'border-green-300 bg-green-50' : ''}`}
        >
          <Text className="font-semibold text-gray-800">{device.name || 'Unknown Device'}</Text>
          <Text className="text-sm text-gray-600">{device.id}</Text>
          {connectedDevice?.id === device.id && (
            <Text className="mt-1 text-sm text-green-600">Connected</Text>
          )}
        </TouchableOpacity>
      ))
    )}
  </View>
);
