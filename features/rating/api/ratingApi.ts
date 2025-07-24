import { RootState } from '@/lib/redux/store';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';

export interface Rating {
  id: string;
  logIn: string;
  type: number;
  name: string;
  rating: number;
  comment: string;
}

export interface RatingSubmitPayload {
  ratings: Rating[];
}

export const ratingApi = createApi({
  reducerPath: 'ratingApi',
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
  endpoints: builder => ({
    getRatingQuestion: builder.query<
      { results: Rating[] },
      { logIn: string; strId: string; visitorId: string }
    >({
      query: ({ logIn, strId, visitorId }) => ({
        url: `/visitors-rating/public/to-rate?logIn='${logIn}'&strId='${strId}'&visitorId='${visitorId}'`,
        method: 'GET',
      }),
    }),
    submitRating: builder.mutation<void, RatingSubmitPayload>({
      query: payload => ({
        url: '/visitors-rating/public/create',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const { useLazyGetRatingQuestionQuery, useSubmitRatingMutation } = ratingApi;
