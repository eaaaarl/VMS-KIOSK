import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  SettingKiosk,
  SettingKioskParam,
  SettingKioskResponse,
} from "./interface";

export const kioskApi = createApi({
  reducerPath: "kioskApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.1.23:4000" }),
  endpoints: (builder) => ({
    getAllKioskSetting: builder.query<SettingKioskResponse, void>({
      query: () => ({
        url: `kiosk-setting/public/kiosk-setting`,
        method: "GET",
      }),
    }),

    getKioskSetting: builder.query<SettingKiosk, SettingKioskParam>({
      query: ({ id }) => ({
        url: `kiosk-setting/public/kiosk-setting/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllKioskSettingQuery, useGetKioskSettingQuery } = kioskApi;
