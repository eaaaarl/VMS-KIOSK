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
  <View className="rounded-lg bg-white p-6 shadow-sm">
    <Text className="mb-4 text-xl font-semibold text-gray-800">Available Devices</Text>
    {devices.length === 0 ? (
      <View className="py-8">
        <Text className="text-center text-lg text-gray-500">
          No devices found. Tap &quot;Discover Devices&quot; to scan.
        </Text>
      </View>
    ) : (
      <View className="gap-3">
        {devices.map(device => (
          <TouchableOpacity
            key={device.id}
            onPress={() => onConnect(device)}
            disabled={isConnecting}
            className={`rounded-lg border-2 p-4 ${connectedDevice?.id === device.id ? 'border-green-400 bg-green-50' : 'border-gray-200 bg-gray-50'}`}
          >
            <Text className="text-lg font-semibold text-gray-800">{device.name || 'Unknown Device'}</Text>
            <Text className="text-base text-gray-600">{device.id}</Text>
            {connectedDevice?.id === device.id && (
              <Text className="mt-2 text-base font-semibold text-green-600">✓ Connected</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    )}
  </View>
);
