import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IOfficeResponse } from './interface';

export const officeApi = createApi({
  reducerPath: 'officeApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.EXPO_PUBLIC_BACKEND_URL }),
  tagTypes: ['AllOffices'],
  endpoints: builder => ({
    getOffices: builder.query<IOfficeResponse, void>({
      query: () => ({
        url: `office/public/office?order=name`,
        method: 'GET',
      }),
      providesTags: ['AllOffices'],
    }),
  }),
});

export const { useGetOfficesQuery } = officeApi;
