import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAvailableVisitorResponse, IVisitorLogResponse } from "./interface";

export const visitorApi = createApi({
  reducerPath: "visitorApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.EXPO_PUBLIC_BACKEND_URL }),
  endpoints: (builder) => ({
    getVisitorsTodays: builder.query<IVisitorLogResponse, { date: string }>({
      query: ({ date }) => ({
        url: `visitors-log/public/visit-log/2?DATE(logIn)='${date}'&order=logIn`,
        method: "GET",
      }),
    }),

    getVisitorsReturned: builder.query<IVisitorLogResponse, { date: string }>({
      query: ({ date }) => ({
        url: `visitors-log/public/visit-log/2?returned=!TRUE&DATE(logIn)=!'${date}'`,
        method: "GET",
      }),
    }),

    getVisitorsLogByDay: builder.query<{ maxDailyLog: number }, void>({
      query: () => ({
        url: `visitor/public/max-log-by-day`,
        method: "GET",
      }),
    }),

    getAllAvailableVisitors: builder.query<
      IAvailableVisitorResponse,
      { dateNow: string }
    >({
      query: ({ dateNow }) => ({
        url: `visitor/public/visitor/available?dateNow=${dateNow}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetVisitorsTodaysQuery,
  useGetVisitorsReturnedQuery,
  useGetVisitorsLogByDayQuery,
  useGetAllAvailableVisitorsQuery,
} = visitorApi;
