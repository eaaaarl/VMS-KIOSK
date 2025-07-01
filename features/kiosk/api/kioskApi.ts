import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SettingKioskResponse } from "./interface";

export const kioskApi = createApi({
  reducerPath: "kioskApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.1.23:4000" }),
  endpoints: (builder) => ({
    getKioskSetting: builder.query<SettingKioskResponse, void>({
      query: () => ({
        url: `kiosk-setting/public/kiosk-setting`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetKioskSettingQuery } = kioskApi;
