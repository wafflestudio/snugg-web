import users from "./users";
import qnaPosts from "./qnaPosts";
import posts from "./posts";
import answerPosts from "./answerPosts";
import { combineReducers, Reducer } from "redux";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { enhancedApi } from "./api/enhanced";
import { apiUser } from "./api/apiUser";

const rootReducer = combineReducers({
  users,
  qnaPosts,
  posts,
  answerPosts,
  [enhancedApi.reducerPath]: enhancedApi.reducer,
  [apiUser.name]: apiUser.reducer,
});

export type AppState = ReturnType<typeof rootReducer>;

const hydratedReducer: Reducer<AppState> = (state, action) => {
  if (action.type === HYDRATE) return { ...state, ...action.payload };
  else return rootReducer(state, action);
};

const makeStore = () =>
  configureStore({
    reducer: hydratedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(enhancedApi.middleware)
  });

type AppDispatch = ReturnType<typeof makeStore>["dispatch"];
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = (selector) =>
  useSelector(selector);

export const wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV !== "production",
});

export const selectUserInfo = (state: AppState) => state.apiUser.user?.user;