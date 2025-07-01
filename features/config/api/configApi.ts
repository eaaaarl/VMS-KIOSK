import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ConfigResponse } from "./interface";

export const configApi = createApi({
  reducerPath: "configApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.1.23:4000" }),
  endpoints: (builder) => ({
    getConfig: builder.query<ConfigResponse, void>({
      query: () => ({
        url: "config/public/config",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetConfigQuery } = configApi;
