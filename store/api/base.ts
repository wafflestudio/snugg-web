// https://redux-toolkit.js.org/rtk-query/usage/code-generation

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AppState } from "../index";

export const API_ENDPOINT =
  "https://fp026w45m5.execute-api.ap-northeast-2.amazonaws.com/";
// const isProduction = process.env.NODE_ENV === "production";
export const isServer = typeof window === "undefined";
export const baseUrl = isServer ? API_ENDPOINT : "/api/";

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as AppState;
      const token = state.apiUser.user?.token.access;
      if (token) headers.set("Authorization", token);
      return headers;
    },
  }),
  endpoints: () => ({}),
});
