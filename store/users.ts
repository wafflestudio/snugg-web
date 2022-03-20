import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api, { SignInParams, SignUpParams, UserTokenResponse } from "../api";

interface UserState {
  data: UserTokenResponse | null;
}

export const signIn = createAsyncThunk(
  "users/signIn",
  async (params: SignInParams) => {
    const res = await api.signIn(params);
    return res.data;
  }
);

export const signUp = createAsyncThunk(
  "users/signUp",
  async (params: SignUpParams) => {
    const res = await api.signUp(params);
    return res.data;
  }
);

export const signOut = createAsyncThunk<void, any, { state: UserState }>(
  "users/signOut",
  async (_payload, { getState }) => {
    const data = getState().data;
    if (!data) throw new Error("토큰이 없어 로그아웃할 수 없습니다");
    await api.signOut({
      refresh_token: data.token.refresh,
    });
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    data: null,
  } as UserState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(signIn.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.data = null;
      }),
});

export default userSlice.reducer;
