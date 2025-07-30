import { resetConnectedDevice, setConnectedDevice } from '@/lib/redux/state/bluetoothSlice';
import { RootState } from '@/lib/redux/store';
import EscPosEncoder from '@manhnd/esc-pos-encoder';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import BluetoothClassic, { BluetoothDevice } from 'react-native-bluetooth-classic';
import { useDispatch, useSelector } from 'react-redux';

export interface UseBluetoothPrinter {
  isBluetoothEnabled: boolean;
  devices: BluetoothDevice[];
  connectedDevice: any | null; // This will be the serializable version
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
  const dispatch = useDispatch();
  const connectedDevice = useSelector((state: RootState) => state.bluetooth.connectedDevice);

  const [isBluetoothEnabled, setIsBluetoothEnabled] = useState(false);
  const [devices, setDevices] = useState<BluetoothDevice[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [debugInfo, setDebugInfo] = useState('');


  // Keep the actual bluetooth connection reference separate from Redux
  const connectedDeviceRef = useRef<BluetoothDevice | null>(null);

  const addDebugInfo = useCallback((info: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setDebugInfo(prev => `${prev}[${timestamp}] ${info}\n`);
  }, []);

  // Function to reconnect to a persisted device
  const reconnectToPersistedDevice = useCallback(async () => {
    if (connectedDevice && !connectedDeviceRef.current) {
      try {
        addDebugInfo(`Attempting to reconnect to ${connectedDevice.name}...`);
        const connection = await BluetoothClassic.connectToDevice(connectedDevice.id);
        connectedDeviceRef.current = connection;
        addDebugInfo(`Successfully reconnected to ${connectedDevice.name}`);
      } catch (error: any) {
        addDebugInfo(`Failed to reconnect: ${error.message}`);
        // Clear the persisted device if reconnection fails
        dispatch(resetConnectedDevice());
      }
    }
  }, [connectedDevice, addDebugInfo, dispatch]);

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
          const pairedDevices = await BluetoothClassic.getBondedDevices();
          setDevices(pairedDevices);
          addDebugInfo('Bluetooth initialized successfully');

          // Try to reconnect to persisted device
          await reconnectToPersistedDevice();
        } else {
          addDebugInfo('Bluetooth is disabled');
        }
      } catch (error: any) {
        addDebugInfo(`Initialization error: ${error.message}`);
      }
    };

    initializeBluetooth();
  }, [requestPermissions, addDebugInfo, reconnectToPersistedDevice]);

  const enableBluetooth = useCallback(async () => {
    try {
      await BluetoothClassic.requestBluetoothEnabled();
      setIsBluetoothEnabled(true);
      addDebugInfo('Bluetooth enabled');
    } catch (error: any) {
      addDebugInfo(`Error enabling Bluetooth: ${error.message}`);
    }
  }, [addDebugInfo]);

  const startDiscovery = useCallback(async () => {
    try {
      setIsScanning(true);
      addDebugInfo('Starting device discovery...');
      setDevices([]);
      const discoveredDevices = await BluetoothClassic.startDiscovery();
      setDevices(discoveredDevices);
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
        connectedDeviceRef.current = connection;

        // Extract only serializable properties before dispatching
        const serializableDevice = {
          address: connection.address,
          name: connection.name,
          bonded: Boolean(connection.bonded),
          id: connection.id,
          type: connection.type,
        };

        dispatch(setConnectedDevice(serializableDevice));
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
      if (connectedDeviceRef.current) {
        await connectedDeviceRef.current.disconnect();
        connectedDeviceRef.current = null;
        dispatch(resetConnectedDevice());
        addDebugInfo('Device disconnected');
      }
    } catch (error: any) {
      addDebugInfo(`Disconnect error: ${error.message}`);
    }
  }, [addDebugInfo, dispatch]);

  const printVisitorPass = useCallback(async () => {
    if (!connectedDeviceRef.current) {
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
      addDebugInfo(`Sending visitor pass (${result.length} bytes)...`);

      await BluetoothClassic.writeToDevice(
        connectedDeviceRef.current.address,
        base64Data,
        'base64'
      );

      addDebugInfo('Visitor pass printed');
      Alert.alert('Success', 'Visitor pass printed successfully!');
    } catch (error: any) {
      addDebugInfo(`Print error: ${error.message}`);
      Alert.alert('Print Error', error.message);
    }
  }, [addDebugInfo]);

  const printVisitorBarcode = useCallback(async () => {
    if (!connectedDeviceRef.current) {
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
      addDebugInfo(`Sending barcode (${result.length} bytes)...`);

      await BluetoothClassic.writeToDevice(
        connectedDeviceRef.current.address,
        base64Data,
        'base64'
      );

      addDebugInfo('Visitor barcode printed');
      Alert.alert('Success', 'Visitor barcode printed successfully!');
    } catch (error: any) {
      addDebugInfo(`Barcode print error: ${error.message}`);
      Alert.alert('Print Error', error.message);
    }
  }, [addDebugInfo]);

  const printVisitorQR = useCallback(async () => {
    if (!connectedDeviceRef.current) {
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
      addDebugInfo(`Sending QR code (${result.length} bytes)...`);

      await BluetoothClassic.writeToDevice(
        connectedDeviceRef.current.address,
        base64Data,
        'base64'
      );

      addDebugInfo('Visitor QR code printed');
      Alert.alert('Success', 'Visitor QR code printed successfully!');
    } catch (error: any) {
      addDebugInfo(`QR code print error: ${error.message}`);
      Alert.alert('Print Error', error.message);
    }
  }, [addDebugInfo]);

  const clearDebugInfo = useCallback(() => {
    setDebugInfo('');
  }, []);

  return {
    isBluetoothEnabled,
    devices,
    connectedDevice, // This returns the serializable version from Redux
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
