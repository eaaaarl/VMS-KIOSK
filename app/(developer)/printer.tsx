import EscPosEncoder from '@manhnd/esc-pos-encoder'
import React, { useEffect, useState } from 'react'
import { Alert, PermissionsAndroid, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import BluetoothClassic, { BluetoothDevice } from 'react-native-bluetooth-classic'

export default function PrinterScreen() {
  const [isBluetoothEnabled, setIsBluetoothEnabled] = useState(false)
  const [devices, setDevices] = useState<BluetoothDevice[]>([])
  const [connectedDevice, setConnectedDevice] = useState<BluetoothDevice | null>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [debugInfo, setDebugInfo] = useState('')

  // Request permissions for Android
  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        ])

        const allPermissionsGranted = Object.values(granted).every(
          permission => permission === PermissionsAndroid.RESULTS.GRANTED
        )

        if (!allPermissionsGranted) {
          Alert.alert('Permissions Required', 'Please grant all permissions to use Bluetooth functionality')
          return false
        }
        return true
      } catch (err) {
        console.warn(err)
        return false
      }
    }
    return true
  }

  // Initialize Bluetooth
  useEffect(() => {
    const initializeBluetooth = async () => {
      try {
        const hasPermissions = await requestPermissions()
        if (!hasPermissions) return

        const enabled = await BluetoothClassic.isBluetoothEnabled()
        setIsBluetoothEnabled(enabled)

        if (enabled) {
          // Get paired devices
          const pairedDevices = await BluetoothClassic.getBondedDevices()
          setDevices(pairedDevices)
          addDebugInfo('Bluetooth initialized successfully')
        } else {
          addDebugInfo('Bluetooth is disabled')
        }
      } catch (error: any) {
        addDebugInfo(`Initialization error: ${error.message}`)
      }
    }

    initializeBluetooth()
  }, [])

  const addDebugInfo = (info: string) => {
    const timestamp = new Date().toLocaleTimeString()
    setDebugInfo(prev => `${prev}[${timestamp}] ${info}\n`)
  }

  const enableBluetooth = async () => {
    try {
      await BluetoothClassic.requestBluetoothEnabled()
      setIsBluetoothEnabled(true)
      addDebugInfo('Bluetooth enabled')
    } catch (error: any) {
      addDebugInfo(`Error enabling Bluetooth: ${error.message}`)
    }
  }

  const startDiscovery = async () => {
    try {
      setIsScanning(true)
      addDebugInfo('Starting device discovery...')

      // Clear existing devices
      setDevices([])

      // Start discovery
      const discoveredDevices = await BluetoothClassic.startDiscovery()
      setDevices(discoveredDevices)
      addDebugInfo(`Found ${discoveredDevices.length} devices`)

      setIsScanning(false)
    } catch (error: any) {
      setIsScanning(false)
      addDebugInfo(`Discovery error: ${error.message}`)
    }
  }

  const connectToDevice = async (device: BluetoothDevice) => {
    try {
      setIsConnecting(true)
      addDebugInfo(`Connecting to ${device.name}...`)

      const connection = await BluetoothClassic.connectToDevice(device.id)
      setConnectedDevice(connection)
      addDebugInfo(`Successfully connected to ${device.name}`)

      setIsConnecting(false)
    } catch (error: any) {
      setIsConnecting(false)
      addDebugInfo(`Connection error: ${error.message}`)
      Alert.alert('Connection Error', error.message)
    }
  }

  const disconnectDevice = async () => {
    try {
      if (connectedDevice) {
        await connectedDevice.disconnect()
        setConnectedDevice(null)
        addDebugInfo('Device disconnected')
      }
    } catch (error: any) {
      addDebugInfo(`Disconnect error: ${error.message}`)
    }
  }

  const printVisitorPass = async () => {
    if (!connectedDevice) {
      Alert.alert('No Connection', 'Please connect to a printer first')
      return
    }

    try {
      const encoder = new EscPosEncoder()
      const result = encoder
        .initialize()
        .codepage('cp437')
        .align('center')
        .size(1)
        .line('VISITOR PASS')
        .line('================')
        .align('left')
        .line('Name: John Doe')
        .line('Company: ABC Corp')
        .line('Host: Jane Smith')
        .line('Department: IT')
        .line('Date: ' + new Date().toLocaleDateString())
        .line('Time In: ' + new Date().toLocaleTimeString())
        .line('Valid Until: ' + new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString())
        .line('================')
        .align('center')
        .line('Please wear this pass')
        .line('at all times')
        .newline()
        .newline()
        .newline()
        .encode()

      const base64Data = btoa(
        String.fromCharCode(...new Uint8Array(result))
      );
      addDebugInfo(`Sending simple test (${result.length} bytes)...`);
      await BluetoothClassic.writeToDevice(
        connectedDevice.address,
        base64Data,
        "base64"
      );
      addDebugInfo('Visitor pass printed')
      Alert.alert('Success', 'Visitor pass printed successfully!')
    } catch (error: any) {
      addDebugInfo(`Print error: ${error.message}`)
      Alert.alert('Print Error', error.message)
    }
  }

  const printVisitorBarcode = async () => {
    if (!connectedDevice) {
      Alert.alert('No Connection', 'Please connect to a printer first')
      return
    }

    try {
      const visitorId = 'VIS' + Date.now().toString().slice(-6)

      const encoder = new EscPosEncoder()
      const result = encoder
        .initialize()
        .align('center')
        .line('VISITOR BARCODE')
        .line('================')
        .barcode(visitorId, 'code128', 60)
        .line('ID: ' + visitorId)
        .line('Date: ' + new Date().toLocaleDateString())
        .newline()
        .newline()
        .encode()

      const base64Data = btoa(
        String.fromCharCode(...new Uint8Array(result))
      );
      addDebugInfo(`Sending simple test (${result.length} bytes)...`);
      await BluetoothClassic.writeToDevice(
        connectedDevice.address,
        base64Data,
        "base64"
      );
      addDebugInfo('Visitor barcode printed')
      Alert.alert('Success', 'Visitor barcode printed successfully!')
    } catch (error: any) {
      addDebugInfo(`Barcode print error: ${error.message}`)
      Alert.alert('Print Error', error.message)
    }
  }

  const printVisitorQR = async () => {
    if (!connectedDevice) {
      Alert.alert('No Connection', 'Please connect to a printer first')
      return
    }

    try {
      const visitorId = 'VIS' + Date.now().toString().slice(-6)
      const qrData = JSON.stringify({
        id: visitorId,
        name: 'John Doe',
        company: 'ABC Corp',
        host: 'Jane Smith',
        date: new Date().toISOString().split('T')[0],
        timeIn: new Date().toLocaleTimeString()
      })

      const encoder = new EscPosEncoder()
      const result = encoder
        .initialize()
        .align('center')
        .line('VISITOR QR CODE')
        .line('================')
        .qrcode(qrData, 1, 8, 'l')
        .line('ID: ' + visitorId)
        .line('Scan for details')
        .newline()
        .newline()
        .encode()

      const base64Data = btoa(
        String.fromCharCode(...new Uint8Array(result))
      );
      addDebugInfo(`Sending simple test (${result.length} bytes)...`);
      await BluetoothClassic.writeToDevice(
        connectedDevice.address,
        base64Data,
        "base64"
      );
      addDebugInfo('Visitor QR code printed')
      Alert.alert('Success', 'Visitor QR code printed successfully!')
    } catch (error: any) {
      addDebugInfo(`QR code print error: ${error.message}`)
      Alert.alert('Print Error', error.message)
    }
  }

  const clearDebugInfo = () => {
    setDebugInfo('')
  }

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      {/* Header */}
      <View className="mb-6">
        <Text className="text-2xl font-bold text-gray-800 mb-2">Printer Management</Text>
        <Text className="text-sm text-gray-600">
          Bluetooth: {isBluetoothEnabled ? 'Enabled' : 'Disabled'}
        </Text>
        <Text className="text-sm text-gray-600">
          Connected: {connectedDevice ? connectedDevice.name : 'None'}
        </Text>
      </View>

      {/* Bluetooth Controls */}
      <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
        <Text className="text-lg font-semibold mb-3">Bluetooth Controls</Text>

        {!isBluetoothEnabled && (
          <TouchableOpacity
            onPress={enableBluetooth}
            className="bg-blue-500 p-3 rounded-lg mb-2"
          >
            <Text className="text-white text-center font-semibold">Enable Bluetooth</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={startDiscovery}
          disabled={!isBluetoothEnabled || isScanning}
          className={`p-3 rounded-lg mb-2 ${!isBluetoothEnabled || isScanning
            ? 'bg-gray-300'
            : 'bg-green-500'
            }`}
        >
          <Text className="text-white text-center font-semibold">
            {isScanning ? 'Scanning...' : 'Discover Devices'}
          </Text>
        </TouchableOpacity>

        {connectedDevice && (
          <TouchableOpacity
            onPress={disconnectDevice}
            className="bg-red-500 p-3 rounded-lg"
          >
            <Text className="text-white text-center font-semibold">Disconnect</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Device List */}
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
              onPress={() => connectToDevice(device)}
              disabled={isConnecting}
              className={`p-3 border border-gray-200 rounded-lg mb-2 ${connectedDevice?.id === device.id ? 'bg-green-50 border-green-300' : ''
                }`}
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

      {/* Printing Controls */}
      <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
        <Text className="text-lg font-semibold mb-3">Printing Tests</Text>

        <TouchableOpacity
          onPress={printVisitorPass}
          disabled={!connectedDevice}
          className={`p-3 rounded-lg mb-2 ${!connectedDevice ? 'bg-gray-300' : 'bg-purple-500'
            }`}
        >
          <Text className="text-white text-center font-semibold">Print Visitor Pass</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={printVisitorBarcode}
          disabled={!connectedDevice}
          className={`p-3 rounded-lg mb-2 ${!connectedDevice ? 'bg-gray-300' : 'bg-orange-500'
            }`}
        >
          <Text className="text-white text-center font-semibold">Print Visitor Barcode</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={printVisitorQR}
          disabled={!connectedDevice}
          className={`p-3 rounded-lg ${!connectedDevice ? 'bg-gray-300' : 'bg-indigo-500'
            }`}
        >
          <Text className="text-white text-center font-semibold">Print Visitor QR Code</Text>
        </TouchableOpacity>
      </View>

      {/* Debug Information */}
      <View className="bg-white rounded-lg p-4 shadow-sm">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-lg font-semibold">Debug Information</Text>
          <TouchableOpacity onPress={clearDebugInfo}>
            <Text className="text-blue-500 text-sm font-semibold">Clear</Text>
          </TouchableOpacity>
        </View>

        <View className="bg-gray-50 p-3 rounded-lg min-h-32">
          <Text className="text-xs font-mono text-gray-700">
            {debugInfo || 'No debug information yet...'}
          </Text>
        </View>
      </View>
    </ScrollView>
  )
}