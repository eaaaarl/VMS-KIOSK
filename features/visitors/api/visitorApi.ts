import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const visitorApi = createApi({
  reducerPath: "visitorApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.1.23:4000" }),
  endpoints: (builder) => ({
    getVisitors: builder.query<void, void>({
      query: () => ({
        url: "visitor-log/public/visit-log",
      }),
    }),
  }),
});

export const { useGetVisitorsQuery } = visitorApi;
