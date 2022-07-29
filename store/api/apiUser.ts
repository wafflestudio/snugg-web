import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Token, User, UserToken } from "./injected";
import { HYDRATE } from "next-redux-wrapper";

type ApiUserState =
  | {
      side: "server";
      user?: {
        user: User;
      };
    }
  | {
      side: "client";
      user?: {
        user: User;
        token: Token;
      };
    };

const initialState: ApiUserState =
  typeof window === "undefined"
    ? {
        side: "server",
      }
    : {
        side: "client",
      };

const name = "apiUser";

export const apiUser = createSlice({
  initialState,
  name,
  reducers: {
    setUser: (state, action: PayloadAction<UserToken | undefined>) => {
      state.user = action.payload;
    },
    setProfile: (state, action: PayloadAction<User>) => {
      if (state.user) state.user.user = action.payload;
    },
    refreshToken: (state, action: PayloadAction<string>) => {
      if (state.side === "client" && state.user) {
        state.user.token.access = action.payload;
      }
    },
  },
  extraReducers: {
    [HYDRATE]: (state, _action) => {
      if (state.side === "server") {
        return _action.payload[name]; // use client side state
      } else {
        return state; // do not hydrate!
      }
    },
  },
});
