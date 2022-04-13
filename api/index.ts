import axios from "axios";
import { LargeNumberLike } from "crypto";

export const API_ENDPOINT = "http://54.180.123.137/";

axios.defaults.baseURL = process.env.NODE_ENV === "production" ? API_ENDPOINT : "/api/";

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

export interface PostResponse {
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

export interface PostParams {
  field: string;
  title: string;
  content: string;
  accepted_answer: number;
  tags: string[];
}

export interface PostId {
  id: number;
}

const api = {
  signIn: async (params: SignInParams) => await axios.post<UserTokenResponse>("/auth/signin/", params),
  signOut: async (params: SignOutParams) => await axios.post<SuccessResponse>("/auth/signout/", params),
  signUp: async (params: SignUpParams) => await axios.post<UserTokenResponse>("/auth/signup/", params),
  createPost: async (params: PostParams) => await axios.post<PostResponse>("/qna/posts", params),
  updatePost: async (id: PostId, params: PostParams) => await axios.put<PostResponse>(`/qna/posts/${id}`, params),
  partialUpdatePost: async (id: PostId, params: PostParams) => await axios.patch<PostResponse>(`/qna/posts/${id}`, params)
};

export default api;
