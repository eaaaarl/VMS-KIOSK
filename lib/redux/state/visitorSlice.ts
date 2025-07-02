import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface VisitorState {
  faceImageId: string;
  cardImageId: string;
}

const initialState: VisitorState = {
  faceImageId: "",
  cardImageId: "",
};

export const visitorSlice = createSlice({
  name: "visitor",
  initialState,
  reducers: {
    setFaceImageId: (state, action: PayloadAction<{ faceImageId: string }>) => {
      state.faceImageId = action.payload.faceImageId;
    },
    setCardImageId: (state, action: PayloadAction<{ cardImageId: string }>) => {
      state.cardImageId = action.payload.cardImageId;
    },

    resetVisitor: (state) => {
      state.faceImageId = "";
      state.cardImageId = "";
    },
  },
});

export const { setFaceImageId, setCardImageId, resetVisitor } =
  visitorSlice.actions;
export const visitorReducer = visitorSlice.reducer;
