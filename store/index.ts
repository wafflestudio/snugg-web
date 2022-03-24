import usersReducer from "./users";
import { combineReducers, Reducer } from "redux";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
const rootReducer = combineReducers({
  users: usersReducer,
});
type RootState = ReturnType<typeof rootReducer>;

const hydratedReducer: Reducer<RootState> = (state, action) => {
  if (action.type === HYDRATE) return { ...state, ...action.payload };
  else return rootReducer(state, action);
};

const makeStore = () =>
  configureStore({
    reducer: hydratedReducer,
  });

type AppDispatch = ReturnType<typeof makeStore>["dispatch"];
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = (selector) =>
  useSelector(selector);

export const wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV !== "production",
});
