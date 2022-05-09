import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api, { PostParams, PostResponse, PostId } from "../api";

interface PostState {
  data: PostResponse | null;
}

interface PostIdParams {
  id: PostId;
  params: PostParams;
}

interface PostTokenParams {
  params: PostParams;
  token: string;
}

// 액션타입을 넣어주면 액션생성함수를 반환
export const createPost = createAsyncThunk("posts/createPost", async ({ params, token }: PostTokenParams) => {
  const res = await api.createPost(params, token);
  return res.data;
});

export const updatePost = createAsyncThunk("posts/updatePost", async ({ id, params }: PostIdParams) => {
  const res = await api.updatePost(id, params);
  return res.data;
});

export const partialUpdatePost = createAsyncThunk("posts/partialUpdatePost", async ({ id, params }: PostIdParams) => {
  const res = await api.partialUpdatePost(id, params);
  return res.data;
});

const postSlice = createSlice({
  name: "posts",
  initialState: {
    data: null
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
      })
});

export default postSlice.reducer;
