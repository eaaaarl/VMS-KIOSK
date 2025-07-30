import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import type { BluetoothDevice } from 'react-native-bluetooth-classic';

interface OtherDevicesProps {
  devices: BluetoothDevice[];
  connectedDevice: BluetoothDevice | null;
  isConnecting: boolean;
  onConnect: (device: BluetoothDevice) => void;
}

export default function OtherDevices({
  devices,
  connectedDevice,
  isConnecting,
  onConnect,
}: OtherDevicesProps) {
  if (devices.length === 0) {
    return null;
  }

  return (
    <View className="rounded-lg bg-white p-6 shadow-sm">
      <Text className="mb-4 text-xl font-semibold text-gray-800">OTHER DEVICES</Text>
      <View className="gap-3">
        {devices.map(device => (
          <TouchableOpacity
            key={device.id}
            onPress={() => onConnect(device)}
            disabled={isConnecting}
            className="rounded-lg border-2 border-gray-200 bg-gray-50 p-4"
          >
            <Text className="text-lg font-semibold text-gray-800">
              {device.name || 'Unknown Device'}
            </Text>
            <Text className="text-base text-gray-600">{device.id}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}