import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IServiceResponse } from './interface';

export const serviceApi = createApi({
  reducerPath: 'serviceApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.EXPO_PUBLIC_BACKEND_URL }),
  tagTypes: ['AllServices'],
  endpoints: builder => ({
    getServices: builder.query<IServiceResponse, void>({
      query: () => ({
        url: `service/public/service?id=!0&type=0&order=name`,
        method: 'GET',
      }),
      providesTags: ['AllServices'],
    }),
  }),
});

export const { useGetServicesQuery } = serviceApi;
