import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  IAvailableVisitorResponse,
  ICheckIDNumberResponse,
  ICreateVisitorLogPayload,
  ICreateVisitorPayload,
  ICreateVisitorResponse,
  IVisitorLogResponse,
} from './interface';

export const visitorApi = createApi({
  reducerPath: 'visitorApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.EXPO_PUBLIC_BACKEND_URL }),
  tagTypes: [
    'VisitorsTodays',
    'VisitorsReturned',
    'VisitorsLogByDay',
    'AllAvailableVisitors',
    'UploadVisitorImages',
    'GetVisitorIdNumber',
  ],
  endpoints: builder => ({
    getVisitorsTodays: builder.query<IVisitorLogResponse, { date: string }>({
      query: ({ date }) => ({
        url: `visitors-log/public/visit-log/2?DATE(logIn)='${date}'&order=logIn`,
        method: 'GET',
      }),
      providesTags: ['VisitorsTodays'],
    }),

    getVisitorsReturned: builder.query<IVisitorLogResponse, { date: string }>({
      query: ({ date }) => ({
        url: `visitors-log/public/visit-log/2?returned=!TRUE&DATE(logIn)=!'${date}'`,
        method: 'GET',
      }),
      providesTags: ['VisitorsReturned'],
    }),

    getVisitorsLogByDay: builder.query<{ maxDailyLog: number }, void>({
      query: () => ({
        url: `visitor/public/max-log-by-day`,
        method: 'GET',
      }),
      providesTags: ['VisitorsLogByDay'],
    }),

    getAllAvailableVisitors: builder.query<IAvailableVisitorResponse, { dateNow: string }>({
      query: ({ dateNow }) => ({
        url: `visitor/public/visitor/available?dateNow=${dateNow}`,
        method: 'GET',
      }),
      providesTags: ['AllAvailableVisitors'],
    }),

    createVisitor: builder.mutation<ICreateVisitorResponse, ICreateVisitorPayload>({
      query: payload => ({
        url: `visitor/public/visitor`,
        method: 'POST',
        body: payload,
      }),

      invalidatesTags: ['AllAvailableVisitors'],
    }),

    SignInVisitorLog: builder.mutation<string, ICreateVisitorLogPayload>({
      query: payload => ({
        url: `visitors-log/public/visit-log`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['VisitorsTodays', 'VisitorsReturned'],
    }),

    uploadVisitorImages: builder.mutation<string, FormData>({
      query: (payload: FormData) => ({
        url: `visitors-log/public/visit-log/photo`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['VisitorsTodays', 'VisitorsReturned'],
    }),

    checkIDNumber: builder.query<ICheckIDNumberResponse, { strId: string }>({
      query: ({ strId }) => ({
        url: `visitors-log/public/visit-log/2?strId='${strId}'&logOut=IS NULL&returned=FALSE`,
        method: 'GET',
      }),
      providesTags: ['GetVisitorIdNumber'],
    }),

    signOutVisitor: builder.mutation<string, { strId: string; dateNow: string; logOut: string }>({
      query: ({ strId, dateNow, logOut }) => ({
        url: `visitors-log/public/visit-log/${strId}/${dateNow}`,
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
      ],
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
} = visitorApi;
