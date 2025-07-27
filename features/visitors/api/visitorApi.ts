import { RootState } from '@/lib/redux/store';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  IAvailableVisitorResponse,
  ICheckIDNumberResponse,
  ICreatePublicReturnIdPayload,
  ICreateVisitorLogPayload,
  ICreateVisitorPayload,
  ICreateVisitorResponse,
  IVisitorLogResponse,
} from './interface';

export const visitorApi = createApi({
  reducerPath: 'visitorApi',
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

    // Use a longer timeout for image uploads
    const isImageUpload = args.url?.includes('/photo');
    const timeout = isImageUpload ? 30000 : 10000;

    const baseQuery = fetchBaseQuery({
      baseUrl,
      timeout,
      prepareHeaders: (headers, { getState }) => {
        // For image uploads, let the browser set the Content-Type
        if (!isImageUpload) {
          headers.set('Content-Type', 'application/json');
        }
        headers.set('Accept', 'application/json');
        return headers;
      },
    });

    try {
      const result = await baseQuery(adjustedArgs, api, extraOptions);
      return result;
    } catch (error) {
      return {
        error: {
          status: 'FETCH_ERROR',
          error: error,
          data: undefined,
        },
      };
    }
  },
  tagTypes: [
    'VisitorsTodays',
    'VisitorsReturned',
    'VisitorsLogByDay',
    'AllAvailableVisitors',
    'UploadVisitorImages',
    'GetVisitorIdNumber',
    'GetVisitorLogInfo',
    'GetVisitorLogInfoSignOut',
  ],
  endpoints: builder => ({
    getVisitorsTodays: builder.query<IVisitorLogResponse, { date: string }>({
      query: ({ date }) => ({
        url: `/visitors-log/public/visit-log/2?DATE(logIn)='${date}'&order=logIn`,
        method: 'GET',
      }),
      providesTags: ['VisitorsTodays'],
    }),

    getVisitorsReturned: builder.query<IVisitorLogResponse, { date: string }>({
      query: ({ date }) => ({
        url: `/visitors-log/public/visit-log/2?returned=!TRUE&DATE(logIn)=!'${date}'`,
        method: 'GET',
      }),
      providesTags: ['VisitorsReturned'],
    }),

    getVisitorsLogByDay: builder.query<{ maxDailyLog: number }, void>({
      query: () => ({
        url: `/visitor/public/max-log-by-day`,
        method: 'GET',
      }),
      providesTags: ['VisitorsLogByDay'],
    }),

    getAllAvailableVisitors: builder.query<IAvailableVisitorResponse, { dateNow: string }>({
      query: ({ dateNow }) => ({
        url: `/visitor/public/visitor/available?dateNow=${dateNow}`,
        method: 'GET',
      }),
      providesTags: ['AllAvailableVisitors'],
    }),

    createVisitor: builder.mutation<ICreateVisitorResponse, ICreateVisitorPayload>({
      query: payload => ({
        url: `/visitor/public/visitor`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['AllAvailableVisitors', 'VisitorsTodays', 'VisitorsReturned'],
    }),

    SignInVisitorLog: builder.mutation<string, ICreateVisitorLogPayload>({
      query: payload => ({
        url: `/visitors-log/public/visit-log`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['VisitorsTodays', 'VisitorsReturned'],
    }),

    uploadVisitorImages: builder.mutation<string, FormData>({
      query: (payload: FormData) => ({
        url: `/visitors-log/public/visit-log/photo`,
        method: 'POST',
        body: payload,
        // Override the default headers for this specific endpoint
        headers: {
          // Remove Content-Type header to let the browser set it with the boundary
          Accept: 'application/json',
        },
      }),
      invalidatesTags: ['VisitorsTodays', 'VisitorsReturned'],
    }),

    checkIDNumber: builder.query<ICheckIDNumberResponse, { strId: string }>({
      query: ({ strId }) => ({
        url: `/visitors-log/public/visit-log/2?strId='${strId}'&logOut=IS NULL&returned=FALSE`,
        method: 'GET',
      }),
      providesTags: ['GetVisitorIdNumber'],
    }),

    getVisitorLogInfoForSignOut: builder.query<IVisitorLogResponse, { strId: string }>({
      query: ({ strId }) => ({
        url: `/visitors-log/public/visit-log/2?strId='${strId}'&logOut=IS NULL&returned=FALSE`,
        method: 'GET',
      }),
      providesTags: ['GetVisitorLogInfoSignOut'],
    }),

    getVisitorLogInfo: builder.query<IVisitorLogResponse, { strId: string }>({
      query: ({ strId }) => ({
        url: `/visitors-log/public/visit-log/2?strId='${strId}'&logOut=IS NULL&returned=FALSE`,
        method: 'GET',
      }),
      providesTags: ['GetVisitorLogInfo'],
    }),

    signOutVisitor: builder.mutation<string, { strId: string; dateNow: string; logOut: string }>({
      query: ({ strId, dateNow, logOut }) => ({
        url: `/visitors-log/public/visit-log/${strId}/${dateNow}`,
        method: 'PUT',
        body: {
          logOut,
          returned: true,
        },
      }),

      invalidatesTags: [
        'GetVisitorIdNumber',
        'VisitorsTodays',
        'VisitorsReturned',
        'VisitorsLogByDay',
        'AllAvailableVisitors',
        'GetVisitorLogInfoSignOut',
      ],
    }),

    signOutAllVisitors: builder.mutation<[], { strId: string; dateNow: string }>({
      query: ({ strId, dateNow }) => ({
        url: `/visitors-log/public/visit-log/${strId}/${dateNow}`,
        method: 'PUT',
        body: { returned: true },
      }),
    }),

    createPublicReturnId: builder.mutation<string, ICreatePublicReturnIdPayload>({
      query: payload => ({
        url: `/return-id/public/return-id`,
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetVisitorsTodaysQuery,
  useGetVisitorsReturnedQuery,
  useLazyGetVisitorsTodaysQuery,
  useLazyGetVisitorsReturnedQuery,
  useGetVisitorsLogByDayQuery,
  useGetAllAvailableVisitorsQuery,
  useLazyGetAllAvailableVisitorsQuery,
  useCreateVisitorMutation,
  useSignInVisitorLogMutation,
  useUploadVisitorImagesMutation,
  useCheckIDNumberQuery,
  useSignOutVisitorMutation,
  useGetVisitorLogInfoQuery,
  useSignOutAllVisitorsMutation,
  useCreatePublicReturnIdMutation,
  useGetVisitorLogInfoForSignOutQuery,
  useLazyGetVisitorLogInfoForSignOutQuery,
} = visitorApi;
