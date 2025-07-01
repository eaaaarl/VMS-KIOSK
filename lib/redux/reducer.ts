import { configApi } from "@/features/config/api/configApi";
import { kioskApi } from "@/features/kiosk/api/kioskApi";
import { userApi } from "@/features/user/api/userApi";
import { visitorApi } from "@/features/visitors/api/visitorApi";
import { combineReducers } from "@reduxjs/toolkit";
import { kioskReducer } from "./state/kioskSlice";

const rootReducer = combineReducers({
  kiosk: kioskReducer,

  [kioskApi.reducerPath]: kioskApi.reducer,
  [visitorApi.reducerPath]: visitorApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [configApi.reducerPath]: configApi.reducer,
});

export const apis = [kioskApi, visitorApi, userApi, configApi];
export const apisReducerPath = apis.map((api) => api.reducerPath);

export default rootReducer;
