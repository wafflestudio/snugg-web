import axios from "axios";

export const API_ENDPOINT = "https://fp026w45m5.execute-api.ap-northeast-2.amazonaws.com/";

const isProduction = process.env.NODE_ENV === "production";
const isServer = typeof window === "undefined";

// 서버에서 api를 요청하는 경우 백엔드로 바로 요청
axios.defaults.baseURL = isProduction || isServer ? API_ENDPOINT : "/api/";

export interface User {
  pk: number;
  email: string;
  username: string;
  birth_date?: string;
  created_at: string;
  last_login?: string;
}

export interface QuestionPost {
  pk: number;
  field: string;
  writer: User;
  title: string;
  content: string;
  created_at: string;
  updated_at?: string;
  accepted_answer?: number;
  tags: string[];
}

export interface UserTokenResponse {
  user: User;
  token: {
    refresh: string;
    access: string;
  };
}

export interface SuccessResponse {
  success: true;
}

export interface PaginatedResponse<T> {
  next: string;
  prev: string;
  results: T[];
}

export type ListQnaResponse = PaginatedResponse<QuestionPost>;

export interface SignInParams {
  email: string;
  password: string;
}

export interface SignOutParams {
  refresh_token: string;
}

export interface SignUpParams {
  email: string;
  username: string;
  password: string;
  birth_date: string | null;
}

export interface PaginationParams {
  cursor?: string;
  ordering?: string;
  page_size?: number;
}

export type ListQnaParams = PaginationParams & {
  field?: string;
  tag?: string;
  writer?: number;
};

export interface QuestionGetParams {
  id: number;
}

export interface QuestionDeleteParams {
  id: number;
}

export interface PostParams {
  field: string;
  title: string;
  content: string;
  accepted_answer?: number;
  tags: string[];
}

export interface AnswerPost {
  pk: number;
  post: number;
  content: string;
}

export type AnswerPostInfo = AnswerPost & {
  writer: User;
  created_at: string;
  updated_at?: string;
};

export type ListAnswerParams = PaginationParams & {
  writer?: User;
};

export type PostId = number;

const api = {
  signIn: async (params: SignInParams) =>
    await axios.post<UserTokenResponse>("/auth/signin/", params),
  signOut: async (params: SignOutParams) =>
    await axios.post<SuccessResponse>("/auth/signout/", params),
  signUp: async (params: SignUpParams) =>
    await axios.post<UserTokenResponse>("/auth/signup/", params),
  getQuestion: async (params: QuestionGetParams) =>
    await axios.get<QuestionPost>(`/qna/posts/${params.id}`),
  deleteQuestion: async (params: QuestionDeleteParams) =>
    await axios.delete(`/qna/posts/${params.id}`),
  createQuestion: async (params: PostParams, token: string) =>
    await axios.post<QuestionPost>("/qna/posts", params, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  updateQuestion: async (id: PostId, params: PostParams, token: string) =>
    await axios.put<QuestionPost>(`/qna/posts/${id}`, params, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  partialUpdateQuestion: async (id: PostId, params: PostParams) =>
    await axios.patch<QuestionPost>(`/qna/posts/${id}`, params),
  listQuestions: async (params: ListQnaParams) =>
    await axios.get<ListQnaResponse>("/qna/posts", { params }),
  listAnswers: async (params: ListAnswerParams) =>
    await axios.get<PaginatedResponse<AnswerPostInfo>>("/qna/answers", {
      params,
    }),
  createAnswer: async (params: AnswerPost, token: string) =>
    await axios.post<AnswerPostInfo>("/qna/answers", params, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getAnswer: async (id: number) =>
    await axios.get<AnswerPostInfo>(`/qna/answers/${id}`),
  updateAnswer: async (id: number, post: AnswerPost) =>
    await axios.put<AnswerPostInfo>(`/qna/answers/${id}`, post),
  partialUpdateAnswer: async (id: number, post: AnswerPost) =>
    await axios.patch(`/qna/answers/${id}`, post),
  deleteAnswer: async (id: number, token: string) =>
    await axios.delete(`/qna/answers/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

export default api;
