import { RootState } from '@/lib/redux/store';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IOfficeResponse } from './interface';

export const officeApi = createApi({
  reducerPath: 'officeApi',
  baseQuery: async (args, api, extraOptions) => {
    const state = api.getState() as RootState;

    // console.log("State keys:", Object.keys(state));
    // console.log("Config exists:", !!state.config);

    const ipAddress = state.config?.ipAddress;
    const port = state.config?.port;
    const baseUrl = `http://${ipAddress}:${port}`;

    // console.log("Using IP:", ipAddress);
    // console.log("Using Port:", port);
    // console.log("Constructed baseUrl:", baseUrl);

    let url: string;
    let adjustedArgs: any;

    if (typeof args === 'string') {
      url = `${baseUrl}${args}`;
      adjustedArgs = url;
    } else {
      url = `${baseUrl}${args.url}`;
      adjustedArgs = { ...args, url };
    }

    const baseQuery = fetchBaseQuery({
      baseUrl,
      timeout: 10000,
      prepareHeaders: (headers, { getState }) => {
        headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');
        return headers;
      },
    });
    return baseQuery(adjustedArgs, api, extraOptions);
  },
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
