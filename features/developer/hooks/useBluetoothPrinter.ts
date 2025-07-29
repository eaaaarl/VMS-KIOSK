import { useAppDispatch, useAppSelector } from '@/lib/redux/hook';
import { clearLastConnectedDevice, setLastConnectedDevice } from '@/lib/redux/state/printerSlice';
import EscPosEncoder from '@manhnd/esc-pos-encoder';
import { useCallback, useEffect, useState } from 'react';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import BluetoothClassic, { BluetoothDevice } from 'react-native-bluetooth-classic';

export interface UseBluetoothPrinter {
  isBluetoothEnabled: boolean;
  devices: BluetoothDevice[];
  connectedDevice: BluetoothDevice | null;
  isScanning: boolean;
  isConnecting: boolean;
  debugInfo: string;
  enableBluetooth: () => Promise<void>;
  startDiscovery: () => Promise<void>;
  connectToDevice: (device: BluetoothDevice) => Promise<void>;
  disconnectDevice: () => Promise<void>;
  printVisitorPass: () => Promise<void>;
  printVisitorBarcode: () => Promise<void>;
  printVisitorQR: () => Promise<void>;
  clearDebugInfo: () => void;
}

export function useBluetoothPrinter(): UseBluetoothPrinter {
  const dispatch = useAppDispatch();
  const lastConnectedDevice = useAppSelector(state => state.printer.lastConnectedDevice);
  const isAutoDiscoveryEnabled = useAppSelector(state => state.printer.isAutoDiscoveryEnabled);

  const [isBluetoothEnabled, setIsBluetoothEnabled] = useState(false);
  const [devices, setDevices] = useState<BluetoothDevice[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<BluetoothDevice | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [debugInfo, setDebugInfo] = useState('');

  const addDebugInfo = useCallback((info: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setDebugInfo(prev => `${prev}[${timestamp}] ${info}\n`);
  }, []);

  const requestPermissions = useCallback(async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        ]);

        const allPermissionsGranted = Object.values(granted).every(
          permission => permission === PermissionsAndroid.RESULTS.GRANTED
        );

        if (!allPermissionsGranted) {
          Alert.alert(
            'Permissions Required',
            'Please grant all permissions to use Bluetooth functionality'
          );
          return false;
        }
        return true;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  }, []);

  useEffect(() => {
    const initializeBluetooth = async () => {
      try {
        const hasPermissions = await requestPermissions();
        if (!hasPermissions) return;

        const enabled = await BluetoothClassic.isBluetoothEnabled();
        setIsBluetoothEnabled(enabled);

        if (enabled) {
          // Get paired devices
          const pairedDevices = await BluetoothClassic.getBondedDevices();
          setDevices(pairedDevices);
          addDebugInfo('Bluetooth initialized successfully');

          // If auto-discovery is enabled, start discovery
          if (isAutoDiscoveryEnabled) {
            startDiscovery();
          }

          // Try to reconnect to last connected device
          if (lastConnectedDevice) {
            const device = pairedDevices.find(d => d.address === lastConnectedDevice.address);
            if (device) {
              addDebugInfo(`Attempting to reconnect to ${device.name}...`);
              connectToDevice(device);
            }
          }
        } else {
          addDebugInfo('Bluetooth is disabled');
        }
      } catch (error: any) {
        addDebugInfo(`Initialization error: ${error.message}`);
      }
    };
    initializeBluetooth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestPermissions, addDebugInfo, lastConnectedDevice, isAutoDiscoveryEnabled]);

  const enableBluetooth = useCallback(async () => {
    try {
      await BluetoothClassic.requestBluetoothEnabled();
      setIsBluetoothEnabled(true);
      addDebugInfo('Bluetooth enabled');

      // Start discovery automatically when Bluetooth is enabled
      if (isAutoDiscoveryEnabled) {
        startDiscovery();
      }
    } catch (error: any) {
      addDebugInfo(`Error enabling Bluetooth: ${error.message}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addDebugInfo, isAutoDiscoveryEnabled]);

  const startDiscovery = useCallback(async () => {
    try {
      setIsScanning(true);
      addDebugInfo('Starting device discovery...');

      // Keep existing devices while scanning
      const discoveredDevices = await BluetoothClassic.startDiscovery();
      setDevices(prev => {
        const existingAddresses = new Set(prev.map(d => d.address));
        const newDevices = discoveredDevices.filter(d => !existingAddresses.has(d.address));
        return [...prev, ...newDevices];
      });

      addDebugInfo(`Found ${discoveredDevices.length} devices`);
      setIsScanning(false);
    } catch (error: any) {
      setIsScanning(false);
      addDebugInfo(`Discovery error: ${error.message}`);
    }
  }, [addDebugInfo]);

  const connectToDevice = useCallback(
    async (device: BluetoothDevice) => {
      try {
        setIsConnecting(true);
        addDebugInfo(`Connecting to ${device.name}...`);
        const connection = await BluetoothClassic.connectToDevice(device.id);
        setConnectedDevice(connection);
        // Save to Redux for persistence
        dispatch(setLastConnectedDevice(connection));
        addDebugInfo(`Successfully connected to ${device.name}`);
        setIsConnecting(false);
      } catch (error: any) {
        setIsConnecting(false);
        addDebugInfo(`Connection error: ${error.message}`);
        Alert.alert('Connection Error', error.message);
      }
    },
    [addDebugInfo, dispatch]
  );

  const disconnectDevice = useCallback(async () => {
    try {
      if (connectedDevice) {
        await connectedDevice.disconnect();
        setConnectedDevice(null);
        // Clear from Redux
        dispatch(clearLastConnectedDevice());
        addDebugInfo('Device disconnected');
      }
    } catch (error: any) {
      addDebugInfo(`Disconnect error: ${error.message}`);
    }
  }, [connectedDevice, addDebugInfo, dispatch]);

  const printVisitorPass = useCallback(async () => {
    if (!connectedDevice) {
      Alert.alert('No Connection', 'Please connect to a printer first');
      return;
    }
    try {
      const encoder = new EscPosEncoder();
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
        .encode();
      const base64Data = btoa(String.fromCharCode(...new Uint8Array(result)));
      addDebugInfo(`Sending simple test (${result.length} bytes)...`);
      await BluetoothClassic.writeToDevice(connectedDevice.address, base64Data, 'base64');
      addDebugInfo('Visitor pass printed');
      Alert.alert('Success', 'Visitor pass printed successfully!');
    } catch (error: any) {
      addDebugInfo(`Print error: ${error.message}`);
      Alert.alert('Print Error', error.message);
    }
  }, [connectedDevice, addDebugInfo]);

  const printVisitorBarcode = useCallback(async () => {
    if (!connectedDevice) {
      Alert.alert('No Connection', 'Please connect to a printer first');
      return;
    }
    try {
      const visitorId = 'VIS' + Date.now().toString().slice(-6);
      const encoder = new EscPosEncoder();
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
        .encode();
      const base64Data = btoa(String.fromCharCode(...new Uint8Array(result)));
      addDebugInfo(`Sending simple test (${result.length} bytes)...`);
      await BluetoothClassic.writeToDevice(connectedDevice.address, base64Data, 'base64');
      addDebugInfo('Visitor barcode printed');
      Alert.alert('Success', 'Visitor barcode printed successfully!');
    } catch (error: any) {
      addDebugInfo(`Barcode print error: ${error.message}`);
      Alert.alert('Print Error', error.message);
    }
  }, [connectedDevice, addDebugInfo]);

  const printVisitorQR = useCallback(async () => {
    if (!connectedDevice) {
      Alert.alert('No Connection', 'Please connect to a printer first');
      return;
    }
    try {
      const visitorId = 'VIS' + Date.now().toString().slice(-6);
      const qrData = JSON.stringify({
        id: visitorId,
        name: 'John Doe',
        company: 'ABC Corp',
        host: 'Jane Smith',
        date: new Date().toISOString().split('T')[0],
        timeIn: new Date().toLocaleTimeString(),
      });
      const encoder = new EscPosEncoder();
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
        .encode();
      const base64Data = btoa(String.fromCharCode(...new Uint8Array(result)));
      addDebugInfo(`Sending simple test (${result.length} bytes)...`);
      await BluetoothClassic.writeToDevice(connectedDevice.address, base64Data, 'base64');
      addDebugInfo('Visitor QR code printed');
      Alert.alert('Success', 'Visitor QR code printed successfully!');
    } catch (error: any) {
      addDebugInfo(`QR code print error: ${error.message}`);
      Alert.alert('Print Error', error.message);
    }
  }, [connectedDevice, addDebugInfo]);

  const clearDebugInfo = useCallback(() => {
    setDebugInfo('');
  }, []);

  return {
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
  };
}
