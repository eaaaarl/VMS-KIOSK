import { configApi } from '@/features/config/api/configApi';
import { kioskApi } from '@/features/kiosk/api/kioskApi';
import { labelApi } from '@/features/label/api/labelApi';
import { officeApi } from '@/features/office/api/officeApi';
import { ratingApi } from '@/features/rating/api/ratingApi';
import { serviceApi } from '@/features/service/api/serviceApi';
import { userApi } from '@/features/user/api/userApi';
import { visitorApi } from '@/features/visitors/api/visitorApi';
import { combineReducers } from '@reduxjs/toolkit';
import { configReducer } from './state/configSlice';
import { kioskReducer } from './state/kioskSlice';
import { visitorReducer } from './state/visitorSlice';

const rootReducer = combineReducers({
  kiosk: kioskReducer,
  visitor: visitorReducer,
  config: configReducer,

  [kioskApi.reducerPath]: kioskApi.reducer,
  [visitorApi.reducerPath]: visitorApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [configApi.reducerPath]: configApi.reducer,
  [officeApi.reducerPath]: officeApi.reducer,
  [serviceApi.reducerPath]: serviceApi.reducer,
  [ratingApi.reducerPath]: ratingApi.reducer,
  [labelApi.reducerPath]: labelApi.reducer,
});

export const apis = [
  kioskApi,
  visitorApi,
  userApi,
  configApi,
  officeApi,
  serviceApi,
  ratingApi,
  labelApi,
];

export const apisReducerPath = apis.map(api => api.reducerPath);

export default rootReducer;
