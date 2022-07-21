import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserToken } from "./injected";

export const apiUser = createSlice({
  initialState: {} as {
    user?: UserToken;
  },
  name: "apiUser",
  reducers: {
    setUser: (state, action: PayloadAction<UserToken | undefined>) => {
      state.user = action.payload;
    },
    refreshToken: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.token.access = action.payload;
      }
    },
  },
});
