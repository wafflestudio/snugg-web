import axios from "axios";

export const API_ENDPOINT = "http://54.180.123.137/";

axios.defaults.baseURL =
  process.env.NODE_ENV === "production" ? API_ENDPOINT : "/api/";

export interface User {
  pk: number;
  email: string;
  username: string;
  birth_date?: string;
  created_at: string;
  last_login?: string;
}

export interface UserTokenResponse {
  user: User;
  token: {
    refresh: string;
    access: string;
  };
}

export interface QuestionResponse {
  pk: number;
  field: string;
  writer: {
    pk: number;
    email: string;
    username: string;
    birth_date: string;
    created_at: string;
    last_login: string;
  };
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  accepted_answer: number;
  tags: string;
}

interface SuccessResponse {
  success: true;
}

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

export interface QuestionGetParams {
  id: number;
}

export interface QuestionDeleteParams {
  id: number;
}

const api = {
  signIn: async (params: SignInParams) =>
    await axios.post<UserTokenResponse>("/auth/signin/", params),
  signOut: async (params: SignOutParams) =>
    await axios.post<SuccessResponse>("/auth/signout/", params),
  signUp: async (params: SignUpParams) =>
    await axios.post<UserTokenResponse>("/auth/signup/", params),
  questionGet: async (params: QuestionGetParams) =>
    await axios.get<QuestionResponse>(`/qna/posts/${params.id}`),
  questionDelete: async (params: QuestionDeleteParams) =>
    await axios.delete<QuestionResponse>(`/qna/posts/${params.id}`),
};

export default api;
