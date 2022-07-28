import { createWrapper } from "next-redux-wrapper";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { enhancedApi } from "./api/enhanced";
import { apiUser } from "./api/apiUser";
import {
  nextReduxCookieMiddleware,
  wrapMakeStore,
} from "next-redux-cookie-wrapper";

const makeStore = wrapMakeStore(() =>
  configureStore({
    reducer: {
      [enhancedApi.reducerPath]: enhancedApi.reducer,
      [apiUser.name]: apiUser.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(enhancedApi.middleware)
        .prepend(
          nextReduxCookieMiddleware({
            subtrees: [`${apiUser.name}.user.user`],
          })
        ),
  })
);

export type AppState = ReturnType<ReturnType<typeof makeStore>["getState"]>;
type AppDispatch = ReturnType<typeof makeStore>["dispatch"];
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = (selector) =>
  useSelector(selector);

export const wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV !== "production",
});

export const selectUserInfo = (state: AppState) => state.apiUser.user?.user;
export const selectAccessToken = (state: AppState) =>
  state.apiUser.side === "client"
    ? state.apiUser.user?.token.access
    : undefined;
export const selectUserSignedIn = (state: AppState) => !!state.apiUser.user;
