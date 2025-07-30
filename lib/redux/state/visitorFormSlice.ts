import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface VisitorFormState {
  formData: {
    visitorName: string;
    visitorId: number;
    mobileNumber: string;
    officeToVisitId: number;
    serviceId: number | null;
    reasonForVisit: string;
    otherReason: string | null | undefined;
  };
}

export const initialState: VisitorFormState = {
  formData: {
    visitorName: '',
    visitorId: 0,
    mobileNumber: '',
    officeToVisitId: 0,
    serviceId: null,
    reasonForVisit: '',
    otherReason: null,
  },
};

export const visitorFormSlice = createSlice({
  name: 'visitorForm',
  initialState,
  reducers: {
    setVisitorFormData: (state, action: PayloadAction<VisitorFormState>) => {
      state.formData = action.payload.formData;
    },

    resetVisitorFormData: state => {
      state.formData = initialState.formData;
    },
  },
});

export const { setVisitorFormData, resetVisitorFormData } = visitorFormSlice.actions;
export const visitorFormReducer = visitorFormSlice.reducer;
