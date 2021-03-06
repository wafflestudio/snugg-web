// https://redux-toolkit.js.org/rtk-query/usage/code-generation

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUser } from "./apiUser";
import { HYDRATE } from "next-redux-wrapper";

export const API_ENDPOINT =
  "https://fp026w45m5.execute-api.ap-northeast-2.amazonaws.com/";
export const isServer = typeof window === "undefined";
export const baseUrl = isServer ? API_ENDPOINT : "/api/";

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as any;
    const token =
      state.apiUser.side === "client" && state.apiUser.user?.token.access;
    if (token) headers.set("Authorization", "Bearer " + token);
    return headers;
  },
});

const baseQueryWithReauth: typeof baseQuery = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      {
        url: "/auth/refresh/",
        body: {
          refresh: "",
        },
        method: "POST",
      },
      api,
      extraOptions
    );
    if (refreshResult.data) {
      const data = refreshResult.data as { token: { access: string } };
      api.dispatch(apiUser.actions.refreshToken(data.token.access));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(apiUser.actions.setUser()); // clear user
    }
  }
  return result;
};

export const baseApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (_build) => ({}),
  extractRehydrationInfo: (action, { reducerPath }) => {
    // must hydrate with data fetched on server side
    if (action.type === HYDRATE) return action.payload[reducerPath];
  },
});
