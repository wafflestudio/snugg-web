import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api, { ListQnaParams, ListQnaResponse } from "../api";

interface QnaPostState {
  data: ListQnaResponse | null;
  loading: boolean;
  error: any | null;
}

export const listQna = createAsyncThunk(
  "listQna",
  async (params: ListQnaParams) => {
    const res = await api.listQna(params);
    return res.data;
  }
);

const qnaPostsSlice = createSlice({
  name: "qnaPosts",
  initialState: {
    data: null,
    loading: false,
    error: null,
  } as QnaPostState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(listQna.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(listQna.pending, (state) => {
        state.loading = true;
      })
      .addCase(listQna.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      }),
});

export default qnaPostsSlice.reducer;
