// https://redux-toolkit.js.org/rtk-query/usage/code-generation

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_ENDPOINT } from "../../api";

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: API_ENDPOINT }),
  endpoints: () => ({}),
});