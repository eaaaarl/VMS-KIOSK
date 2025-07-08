import { createSlice } from '@reduxjs/toolkit';

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
    setIpAddress: (state, action) => {
      state.ipAddress = action.payload;
    },
    setPort: (state, action) => {
      state.port = action.payload;
    },
    resetConfig: () => initialState,
  },
});

export const { setIpAddress, setPort, resetConfig } = configSlice.actions;
export const configReducer = configSlice.reducer;
