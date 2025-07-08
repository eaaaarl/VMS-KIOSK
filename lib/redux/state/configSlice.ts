import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ConfigState {
  ipAddress: string;
  port: number;
}

const initialState: ConfigState = {
  ipAddress: '',
  port: 0,
};

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setIpAddressConfig: (state, action: PayloadAction<{ ipAddress: string }>) => {
      state.ipAddress = action.payload.ipAddress;
    },
    setPortConfig: (state, action: PayloadAction<{ port: number }>) => {
      state.port = action.payload.port;
    },
    resetConfig: () => initialState,
  },
});

export const { setIpAddressConfig, setPortConfig, resetConfig } = configSlice.actions;
export const configReducer = configSlice.reducer;
