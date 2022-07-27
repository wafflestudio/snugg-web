import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api, { CommentParams, CommentInfo, CommentQuery } from "../api";

interface CommentState {
  data: CommentInfo | null;
}

interface CommentTokenParams {
  body: CommentParams;
  params: CommentQuery;
  token: string;
}

export const createComment = createAsyncThunk(
  "createComment",
  async ({ body, params, token }: CommentTokenParams) => {
    const res = await api.createComment(body, params, token);
    return res.data;
  }
);

export const updateComment = createAsyncThunk(
  "updateComment",
  async ({
    id,
    params,
    token,
  }: {
    id: number;
    params: CommentParams;
    token: string;
  }) => {
    const res = await api.updateComment(id, params, token);
    return res.data;
  }
);

export const partialUpdateComment = createAsyncThunk(
  "partialUpdateComment",
  async ({
    id,
    params,
    token,
  }: {
    id: number;
    params: CommentParams;
    token: string;
  }) => {
    const res = await api.partialUpdateComment(id, params, token);
    return res.data;
  }
);

const postSlice = createSlice({
  name: "comments",
  initialState: {
    data: null,
  } as CommentState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(createComment.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(partialUpdateComment.fulfilled, (state, action) => {
        state.data = action.payload;
      }),
});

export default postSlice.reducer;
