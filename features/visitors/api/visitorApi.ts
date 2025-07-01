import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IVisitorLogResponse } from "./interface";

export const visitorApi = createApi({
  reducerPath: "visitorApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.1.23:4000" }),
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
  }),
});

export const { useGetVisitorsTodaysQuery, useGetVisitorsReturnedQuery } =
  visitorApi;
