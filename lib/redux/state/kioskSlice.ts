import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface KioskState {
  kioskSettingId: number | null;
}

const initialState: KioskState = {
  kioskSettingId: null,
};

export const kioskSlice = createSlice({
  name: 'kiosk',
  initialState,
  reducers: {
    setKioskSettingId: (state, action: PayloadAction<{ kioskSettingId: number | null }>) => {
      state.kioskSettingId = action.payload.kioskSettingId;
    },
    resetKioskSettingId: state => {
      state.kioskSettingId = null;
    },
  },
});

export const { setKioskSettingId, resetKioskSettingId } = kioskSlice.actions;

export const kioskReducer = kioskSlice.reducer;
