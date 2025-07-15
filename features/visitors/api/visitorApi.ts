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
      invalidatesTags: ['AllAvailableVisitors'],
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
        'GetVisitorLogInfoSignOut'
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
  useGetVisitorsLogByDayQuery,
  useGetAllAvailableVisitorsQuery,
  useCreateVisitorMutation,
  useSignInVisitorLogMutation,
  useUploadVisitorImagesMutation,
  useCheckIDNumberQuery,
  useSignOutVisitorMutation,
  useGetVisitorLogInfoQuery,
  useSignOutAllVisitorsMutation,
  useCreatePublicReturnIdMutation,
  useGetVisitorLogInfoForSignOutQuery,
} = visitorApi;
