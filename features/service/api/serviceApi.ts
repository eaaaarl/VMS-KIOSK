import { RootState } from '@/lib/redux/store';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IServiceResponse } from './interface';

export const serviceApi = createApi({
  reducerPath: 'serviceApi',
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
  tagTypes: ['AllServices'],
  endpoints: builder => ({
    getServices: builder.query<IServiceResponse, void>({
      query: () => ({
        url: `/service/public/service?id=!0&type=0&order=name`,
        method: 'GET',
      }),
      providesTags: ['AllServices'],
    }),
  }),
});

export const { useGetServicesQuery, useLazyGetServicesQuery } = serviceApi;
