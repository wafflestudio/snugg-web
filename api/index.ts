import axios from "axios";
import { baseUrl, isServer } from "../store/api/base";

export const IMAGE_ENDPOINT = "https://snugg-s3.s3.amazonaws.com/";

// 서버에서 api를 요청하는 경우 백엔드로 바로 요청
axios.defaults.baseURL = baseUrl;
if (isServer) {
  axios.interceptors.request.use((config) => {
    console.log(config.method, config.baseURL, config.url, config.data);
    return config;
  });
  axios.interceptors.response.use(
    (response) => {
      console.log(response?.status, response?.data);
      return response;
    },
    (error) => {
      if (axios.isAxiosError(error)) {
        console.log("error");
        console.log(
          error.message,
          error.code,
          error.response?.status,
          error.response?.data
        );
      }
      return Promise.reject(error);
    }
  );
}

export interface User {
  pk: number;
  email: string;
  username: string;
  birth_date?: string;
  self_introduction?: string;
  created_at: string;
  last_login?: string;
}

export interface ProfileParams {
  email: string;
  username: string;
  birth_date?: string | null;
  self_introduction?: string;
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
  presigned: {
    url: string;
    fields: {
      key: string;
      AWSAccessKeyId: string;
      policy: string;
      signature: string;
    };
  };
}

export type QuestionPostInfo = QuestionPost;

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
  search?: string;
  search_type?: string;
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
  post: number;
  content: string;
}

export type AnswerPostInfo = AnswerPost & {
  pk: number;
  writer: User;
  created_at: string;
  updated_at?: string;
};

export type ListAnswerParams = PaginationParams & {
  writer?: number;
};

const withToken = (token: string) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export type GetAnswersForQuestionParams = {
  questionId: string;
};

export interface ListAgoraPostParams extends PaginationParams {
  lecture: number;
  search?: string;
  writer?: number;
}

export interface AgoraPost {
  lecture: number;
  title: string;
  content: string;
}

export interface AgoraPostInfo {
  lecture: AgoraLectureInfo;
  title: string;
  content: string;
  pk: number;
  writer: User;
  created_at: string;
  updated_at?: string;
  presigned: {
    url: string;
    fields: {
      key: string;
      AWSAccessKeyId: string;
      policy: string;
      signature: string;
    };
  };
}

export type ListAgoraLectureParams = {
  college?: string;
  major?: string;
  ordering?: string;
  page?: number;
  page_size?: number;
  search?: string;
  season?: number;
  university?: string;
  year?: number;
};

export type AgoraLectureInfo = {
  pk: number;
  name: string;
  lecture_id: string;
  instructor: string;
  university: string;
  college: string;
  major: string;
  semesters: string[];
};

export type ListAgoraLectureInfo = {
  count: number;
  next: string;
  previous: string;
  results: AgoraLectureInfo[];
};

export type CommentParams = {
  content_type?: number;
  object_id?: number;
  content: string;
};

export type CommentInfo = {
  pk: number;
  writer: User;
  content: string;
  replies_count: number;
  created_at: string;
  updated_at: string;
};

export type ListCommentInfo = {
  next: string;
  previous: string;
  results: CommentInfo[];
};

export type CommentQuery = {
  answer?: number;
  comment?: number;
  post?: number;
};
type EmptyResponse = Record<string, never>;

const api = {
  getQuestion: async (params: QuestionGetParams) =>
    await axios.get<QuestionPost>(`/qna/posts/${params.id}`),
  deleteQuestion: async (params: QuestionDeleteParams, token: string) =>
    await axios.delete(`/qna/posts/${params.id}`, withToken(token)),
  createQuestion: async (params: PostParams, token: string) =>
    await axios.post<QuestionPost>("/qna/posts", params, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  updateQuestion: async (id: number, params: PostParams, token: string) =>
    await axios.put<QuestionPost>(`/qna/posts/${id}`, params, withToken(token)),
  partialUpdateQuestion: async (
    id: number,
    params: Partial<PostParams>,
    token: string
  ) =>
    await axios.patch<QuestionPost>(
      `/qna/posts/${id}`,
      params,
      withToken(token)
    ),
  acceptAnswer: async (questionId: number, answerId: number, token: string) =>
    await api.partialUpdateQuestion(
      questionId,
      { accepted_answer: answerId },
      token
    ),
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
    await axios.delete<EmptyResponse>(`/qna/answers/${id}`, withToken(token)),
  uploadImages: async (url: string, key: string, blob: Blob) => {
    const formData = new FormData();
    formData.set("key", key);
    formData.set("file", blob);
    return await axios.post<EmptyResponse>(url, formData, { baseURL: "" });
  },
  listAgoraPost: async (params: ListAgoraPostParams) =>
    await axios.get<PaginatedResponse<AgoraPostInfo>>(`/agora/storys/`, {
      params,
    }),
  createAgoraPost: async (params: AgoraPost, token: string) =>
    await axios.post<AgoraPostInfo>(`/agora/storys/`, params, withToken(token)),
  getAgoraPost: async (id: number) =>
    await axios.get<AgoraPostInfo>(`/agora/storys/${id}`),
  updateAgoraPost: async (id: number, params: AgoraPost, token: string) =>
    await axios.put<AgoraPostInfo>(
      `/agora/storys/${id}`,
      params,
      withToken(token)
    ),
  partialUpdateAgoraPost: async (
    id: number,
    params: Partial<AgoraPost>,
    token: string
  ) =>
    await axios.patch<AgoraPostInfo>(
      `/agora/storys/${id}`,
      params,
      withToken(token)
    ),
  deleteAgoraPost: async (id: number, token: string) =>
    await axios.delete<{}>(`/agora/storys/${id}`, withToken(token)),
  listAgoraLecture: async (params: ListAgoraLectureParams) =>
    await axios.get<ListAgoraLectureInfo>(`/agora/lectures`, { params }),
  getAgoraLecture: async (id: number) =>
    await axios.get<AgoraLectureInfo>(`agora/lectures/${id}`),
  createComment: async (
    body: CommentParams,
    params: CommentQuery,
    token: string
  ) =>
    await axios.post<CommentInfo>(`/qna/comments`, body, {
      params: params,
      headers: { Authorization: `Bearer ${token}` },
    }),
  listComment: async (type: string, id: number) =>
    await axios.get<ListCommentInfo>(`/qna/comments/?${type}=${id}`),
  updateComment: async (id: number, params: CommentParams, token: string) =>
    await axios.put<CommentInfo>(
      `/qna/comments/${id}`,
      params,
      withToken(token)
    ),
  partialUpdateComment: async (
    id: number,
    params: Partial<CommentParams>,
    token: string
  ) =>
    await axios.put<CommentInfo>(
      `/qna/comments/${id}`,
      params,
      withToken(token)
    ),
  deleteComment: async (id: number, token: string) =>
    await axios.delete<{}>(`/qna/comments/${id}`, withToken(token)),
  updateProfile: async (params: ProfileParams, token: string) =>
    await axios.put<User>(`/auth/profile`, params, withToken(token)),
};

export default api;
