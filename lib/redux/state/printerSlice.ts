import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BluetoothDevice } from 'react-native-bluetooth-classic';

interface PrinterState {
  lastConnectedDevice: {
    id: string;
    name: string;
    address: string;
  } | null;
  isAutoDiscoveryEnabled: boolean;
}

const initialState: PrinterState = {
  lastConnectedDevice: null,
  isAutoDiscoveryEnabled: true,
};

export const printerSlice = createSlice({
  name: 'printer',
  initialState,
  reducers: {
    setLastConnectedDevice: (state, action: PayloadAction<BluetoothDevice>) => {
      state.lastConnectedDevice = {
        id: action.payload.id,
        name: action.payload.name,
        address: action.payload.address,
      };
    },
    clearLastConnectedDevice: (state) => {
      state.lastConnectedDevice = null;
    },
    setAutoDiscovery: (state, action: PayloadAction<boolean>) => {
      state.isAutoDiscoveryEnabled = action.payload;
    },
  },
});

export const { setLastConnectedDevice, clearLastConnectedDevice, setAutoDiscovery } = printerSlice.actions;
export const printerReducer = printerSlice.reducer; 