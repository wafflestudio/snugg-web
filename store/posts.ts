import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api, { PostParams, QuestionPost } from "../api";

interface PostState {
  data: QuestionPost | null;
}

interface PostTokenParams {
  params: PostParams;
  token: string;
}

// 액션타입을 넣어주면 액션생성함수를 반환
export const createPost = createAsyncThunk(
  "createPost",
  async ({ params, token }: PostTokenParams) => {
    const res = await api.createQuestion(params, token);
    return res.data;
  }
);

export const updatePost = createAsyncThunk(
  "updatePost",
  async ({
    id,
    params,
    token,
  }: {
    id: number;
    params: PostParams;
    token: string;
  }) => {
    const res = await api.updateQuestion(id, params, token);
    return res.data;
  }
);

export const partialUpdatePost = createAsyncThunk(
  "partialUpdatePost",
  async ({
    id,
    params,
    token,
  }: {
    id: number;
    params: PostParams;
    token: string;
  }) => {
    const res = await api.partialUpdateQuestion(id, params, token);
    return res.data;
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState: {
    data: null,
  } as PostState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(createPost.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(partialUpdatePost.fulfilled, (state, action) => {
        state.data = action.payload;
      }),
});

export default postSlice.reducer;
