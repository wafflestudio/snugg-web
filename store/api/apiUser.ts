import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RefreshToken, UserToken } from "./injected";

export const apiUser = createSlice({
  initialState: {} as {
    user?: UserToken;
  },
  name: "apiUser",
  reducers: {
    setUser: (state, action: PayloadAction<UserToken | undefined>) => {
      state.user = action.payload;
    },
    setRefreshToken: (state, action: PayloadAction<RefreshToken>) => {
      if (state.user) {
        state.user.token.refresh = action.payload.refresh;
      }
    },
  },
});
