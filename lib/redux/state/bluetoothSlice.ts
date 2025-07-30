import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a serializable device info interface
interface SerializableDeviceInfo {
  address: string;
  name: string;
  bonded: boolean;
  id: string;
  type: string;
}

interface BluetoothState {
  connectedDevice: SerializableDeviceInfo | null;
}

export const initialState: BluetoothState = {
  connectedDevice: null,
};

export const bluetoothSlice = createSlice({
  name: 'bluetooth',
  initialState,
  reducers: {
    setConnectedDevice: (state, action: PayloadAction<SerializableDeviceInfo | null>) => {
      state.connectedDevice = action.payload;
    },
    resetConnectedDevice: () => initialState,
  },
});

export const { setConnectedDevice, resetConnectedDevice } = bluetoothSlice.actions;
export const bluetoothReducer = bluetoothSlice.reducer;
