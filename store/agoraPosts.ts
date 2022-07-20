import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api, { AgoraPost, AgoraPostInfo } from "../api";

interface AgoraPostState {
  data: AgoraPostInfo | null;
}

interface AgoraPostTokenParams {
  params: AgoraPost;
  token: string;
}

// 액션타입을 넣어주면 액션생성함수를 반환
export const createAgoraPost = createAsyncThunk(
  "createAgoraPost",
  async ({ params, token }: AgoraPostTokenParams) => {
    const res = await api.createAgoraPost(params, token);
    return res.data;
  }
);

export const updateAgoraPost = createAsyncThunk(
  "updateAgoraPost",
  async ({
    id,
    params,
    token,
  }: {
    id: number;
    params: AgoraPost;
    token: string;
  }) => {
    const res = await api.updateAgoraPost(id, params, token);
    return res.data;
  }
);

export const partialUpdateAgoraPost = createAsyncThunk(
  "partialUpdateAgoraPost",
  async ({
    id,
    params,
    token,
  }: {
    id: number;
    params: Partial<AgoraPost>;
    token: string;
  }) => {
    const res = await api.partialUpdateAgoraPost(id, params, token);
    return res.data;
  }
);

const postSlice = createSlice({
  name: "agoraPosts",
  initialState: {
    data: null,
  } as AgoraPostState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(createAgoraPost.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(updateAgoraPost.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(partialUpdateAgoraPost.fulfilled, (state, action) => {
        state.data = action.payload;
      }),
});

export default postSlice.reducer;
