import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api, {
  AnswerPost,
  AnswerPostInfo,
  ListAnswerParams,
  PaginatedResponse,
} from "../api";

interface AnswerPostsState {
  listAnswers: PaginatedResponse<AnswerPostInfo> | null;
  answer: AnswerPostInfo | null;
}

export const listAnswers = createAsyncThunk(
  "listAnswers",
  async (params: ListAnswerParams) => {
    return (await api.listAnswers(params)).data;
  }
);

export const getAnswer = createAsyncThunk("getAnswer", async (id: number) => {
  return (await api.getAnswer(id)).data;
});

export const updateAnswer = createAsyncThunk(
  "updateAnswer",
  async ({ id, params }: { id: number; params: AnswerPost }) => {
    return (await api.updateAnswer(id, params)).data;
  }
);

export const deleteAnswer = createAsyncThunk(
  "deleteAnswer",
  async ({ id, token }: { id: number; token: string }) => {
    return (await api.deleteAnswer(id, token)).data;
  }
);

export const createAnswer = createAsyncThunk(
  "createAnswer",
  async (params: AnswerPost) => {
    return (await api.createAnswer(params)).data;
  }
);

const answersSlice = createSlice({
  name: "answers",
  initialState: {} as AnswerPostsState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(listAnswers.fulfilled, (state, action) => {
        state.listAnswers = action.payload;
      })
      .addCase(getAnswer.fulfilled, (state, action) => {
        state.answer = action.payload;
      })
      .addCase(updateAnswer.fulfilled, (state, action) => {
        state.answer = action.payload;
      })
      .addCase(deleteAnswer.fulfilled, (state) => {
        state.answer = null;
      })
      .addCase(createAnswer.fulfilled, (state, action) => {
        state.answer = action.payload;
      }),
});

export default answersSlice.reducer;
