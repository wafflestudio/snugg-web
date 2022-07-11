import axios from "axios";

export const API_ENDPOINT =
  "https://fp026w45m5.execute-api.ap-northeast-2.amazonaws.com/";

export const IMAGE_ENDPOINT = "https://snugg-s3.s3.amazonaws.com/";

// const isProduction = process.env.NODE_ENV === "production";
const isServer = typeof window === "undefined";

// 서버에서 api를 요청하는 경우 백엔드로 바로 요청
axios.defaults.baseURL = isServer ? API_ENDPOINT : "/api/";

export interface User {
  pk: number;
  email: string;
  username: string;
  birth_date?: string;
  created_at: string;
  last_login?: string;
}

export interface QuestionPost {
  field: string;
  title: string;
  content: string;
  accepted_answer?: number;
  tags: string[];
}

export interface PresignedUrlInfo {
  presigned: {
    url: string;
    fields: {
      key: string;
      AWSAccessKeyId: string;
      policy: string;
      signature: string;
    };
  }
}

interface PostInfo {
  pk: number;
  writer: User;
  created_at: string;
  updated_at?: string;
}

export interface QuestionPostInfo extends QuestionPost, PresignedUrlInfo, PostInfo {}

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

export type ListQnaResponse = PaginatedResponse<QuestionPostInfo>;

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

export interface AnswerPost {
  post: number;
  content: string;
}

export interface AnswerPostInfo extends AnswerPost, PostInfo {}

export interface ListAnswerParams extends PaginationParams {
  writer?: User;
}

export type PostId = number;

const withToken = (token: string) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export interface GetAnswersForQuestionParams {
  questionId: string;
}

export interface ListAgoraPostParams extends PaginationParams {
  lecture: number;
  search?: string;
  writer?: number;
}

export interface AgoraPost {
  lecture: string;
  title: string;
  content: string;
}

export interface AgoraPostInfo extends AgoraPost, PostInfo {}

const api = {
  signIn: async (params: SignInParams) =>
    await axios.post<UserTokenResponse>("/auth/signin/", params),
  signOut: async (params: SignOutParams) =>
    await axios.post<SuccessResponse>("/auth/signout/", params),
  signUp: async (params: SignUpParams) =>
    await axios.post<UserTokenResponse>("/auth/signup/", params),
  getQuestion: async (params: QuestionGetParams) =>
    await axios.get<QuestionPostInfo>(`/qna/posts/${params.id}`),
  deleteQuestion: async (params: QuestionDeleteParams, token: string) =>
    await axios.delete(`/qna/posts/${params.id}`, withToken(token)),
  createQuestion: async (params: QuestionPost, token: string) =>
    await axios.post<QuestionPostInfo>("/qna/posts", params, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  updateQuestion: async (id: PostId, params: QuestionPost, token: string) =>
    await axios.put<QuestionPostInfo>(`/qna/posts/${id}`, params, withToken(token)),
  partialUpdateQuestion: async (id: PostId, params: QuestionPost) =>
    await axios.patch<QuestionPostInfo>(`/qna/posts/${id}`, params),
  listQuestions: async (params: ListQnaParams) =>
    await axios.get<ListQnaResponse>("/qna/posts", { params }),
  listAnswers: async (params: ListAnswerParams) =>
    await axios.get<PaginatedResponse<AnswerPostInfo>>("/qna/answers", {
      params,
    }),
  getAnswersForQuestion: async (params: GetAnswersForQuestionParams) =>
    await axios.get<PaginatedResponse<AnswerPostInfo>>(
      `/qna/answers/?post=${params.questionId}`
    ),
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
    await axios.delete(`/qna/answers/${id}`, withToken(token)),
  uploadImages: async (url: string, key: string, blob: Blob) => {
    const formData = new FormData();
    formData.set("key", key);
    formData.set("file", blob);
    return await axios.post(url, formData, { baseURL: "" });
  },
  listAgoraPost: async (params: ListAgoraPostParams) =>
    await axios.get<PaginatedResponse<AgoraPostInfo>>(`/agora/posts/`, { params }),
  createAgoraPost: async (params: AgoraPost) =>
    await axios.post<AgoraPostInfo>(`/agora/posts/`, params),
  getAgoraPost: async (id: PostId) =>
    await axios.get<AgoraPostInfo>(`/agora/posts/${id}`),
  updateAgoraPost: async (id: PostId, params: AgoraPost) =>
    await axios.put<AgoraPostInfo>(`/agora/posts/${id}`, params),
  partialUpdateAgoraPost: async (id: PostId, params: Partial<AgoraPost>) =>
    await axios.patch<AgoraPostInfo>(`/agora/posts/${id}`, params),
  deleteAgoraPost: async (id: PostId) =>
    await axios.delete<{}>(`/agora/posts/${id}`),
};

export default api;
