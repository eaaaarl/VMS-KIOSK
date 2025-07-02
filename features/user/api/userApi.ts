import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuthResponse } from "./interface";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.EXPO_PUBLIC_BACKEND_URL }),
  endpoints: (builder) => ({
    userLogin: builder.mutation<
      AuthResponse,
      { username: string; password: string }
    >({
      query: ({ username, password }) => ({
        url: "user/login",
        method: "POST",
        body: { username, password },
      }),
    }),
  }),
});

export const { useUserLoginMutation } = userApi;
