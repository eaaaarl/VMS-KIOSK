import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import type { BluetoothDevice } from 'react-native-bluetooth-classic'

interface DeviceListProps {
  devices: BluetoothDevice[]
  connectedDevice: BluetoothDevice | null
  isConnecting: boolean
  onConnect: (device: BluetoothDevice) => void
}

export const DeviceList: React.FC<DeviceListProps> = ({
  devices,
  connectedDevice,
  isConnecting,
  onConnect,
}) => (
  <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
    <Text className="text-lg font-semibold mb-3">Available Devices</Text>
    {devices.length === 0 ? (
      <Text className="text-gray-500 text-center py-4">
        No devices found. Tap &quot;Discover Devices&quot; to scan.
      </Text>
    ) : (
      devices.map((device) => (
        <TouchableOpacity
          key={device.id}
          onPress={() => onConnect(device)}
          disabled={isConnecting}
          className={`p-3 border border-gray-200 rounded-lg mb-2 ${connectedDevice?.id === device.id ? 'bg-green-50 border-green-300' : ''}`}
        >
          <Text className="font-semibold text-gray-800">
            {device.name || 'Unknown Device'}
          </Text>
          <Text className="text-sm text-gray-600">{device.id}</Text>
          {connectedDevice?.id === device.id && (
            <Text className="text-sm text-green-600 mt-1">Connected</Text>
          )}
        </TouchableOpacity>
      ))
    )}
  </View>
) 