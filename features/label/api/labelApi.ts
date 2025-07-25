import { RootState } from '@/lib/redux/store';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ILabelConfig } from './interface';

export const labelApi = createApi({
  reducerPath: 'labelApi',
  baseQuery: async (args, api, extraOptions) => {
    const state = api.getState() as RootState;
    const ipAddress = state.config?.ipAddress;
    const port = state.config?.port;
    const baseUrl = `http://${ipAddress}:${port}`;

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
    });

    return baseQuery(adjustedArgs, api, extraOptions);
  },
  endpoints: builder => ({
    getLabelConfig: builder.query<ILabelConfig[], void>({
      query: () => {
        return {
          url: '/label-message/public/label-message',
          method: 'GET',
        };
      },
    }),
  }),
});

export const { useGetLabelConfigQuery, useLazyGetLabelConfigQuery } = labelApi;
