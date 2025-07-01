import { kioskApi } from "@/features/kiosk/api/kioskApi";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  [kioskApi.reducerPath]: kioskApi.reducer,
});

export const apis = [kioskApi];
export const apisReducerPath = apis.map((api) => api.reducerPath);

export default rootReducer;
