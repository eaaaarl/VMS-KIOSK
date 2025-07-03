import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ConfigResponse } from './interface';

export const configApi = createApi({
  reducerPath: 'configApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.EXPO_PUBLIC_BACKEND_URL }),
  tagTypes: ['Config'],
  endpoints: builder => ({
    getConfig: builder.query<ConfigResponse[], void>({
      query: () => ({
        url: 'config/public/config',
        method: 'GET',
      }),
      providesTags: ['Config'],
    }),
  }),
});

export const { useGetConfigQuery } = configApi;
