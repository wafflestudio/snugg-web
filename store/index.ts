import users from "./users";
import qnaPosts from "./qnaPosts";
import { combineReducers, Reducer } from "redux";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const rootReducer = combineReducers({
  users,
  qnaPosts,
});
export type AppState = ReturnType<typeof rootReducer>;

const hydratedReducer: Reducer<AppState> = (state, action) => {
  if (action.type === HYDRATE) return { ...state, ...action.payload };
  else return rootReducer(state, action);
};

const makeStore = () =>
  configureStore({
    reducer: hydratedReducer,
  });

export type AppStore = ReturnType<typeof makeStore>;
type AppDispatch = AppStore["dispatch"];
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = (selector) =>
  useSelector(selector);

export const wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV !== "production",
});
