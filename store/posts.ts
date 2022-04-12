import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api, { PostParams, PostResponse } from "../api";

interface UserState {
  data: PostResponse | null;
}

// 액션타입을 넣어주면 액션생성함수를 반환
export const createPost = createAsyncThunk("posts/createPost", async (params: PostParams) => {
  const res = await api.createPost(params);
  return res.data;
});

const postSlice = createSlice({
  name: "posts",
  initialState: {
    data: null
  } as UserState,
  reducers: {},
  extraReducers: (builder) =>
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.data = action.payload;
    })
});

export default postSlice.reducer;
