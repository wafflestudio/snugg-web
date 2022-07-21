import { baseApi as api } from "store/api/base";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    agoraLecturesList: build.query<
      AgoraLecturesListApiResponse,
      AgoraLecturesListApiArg
    >({
      query: (queryArg) => ({
        url: `/agora/lectures/`,
        params: {
          college: queryArg.college,
          major: queryArg.major,
          ordering: queryArg.ordering,
          page: queryArg.page,
          page_size: queryArg.pageSize,
          search: queryArg.search,
          season: queryArg.season,
          university: queryArg.university,
          year: queryArg.year,
        },
      }),
    }),
    agoraLecturesRetrieve: build.query<
      AgoraLecturesRetrieveApiResponse,
      AgoraLecturesRetrieveApiArg
    >({
      query: (queryArg) => ({ url: `/agora/lectures/${queryArg.id}/` }),
    }),
    agoraPostsList: build.query<
      AgoraPostsListApiResponse,
      AgoraPostsListApiArg
    >({
      query: (queryArg) => ({
        url: `/agora/posts/`,
        params: {
          cursor: queryArg.cursor,
          lecture: queryArg.lecture,
          ordering: queryArg.ordering,
          page_size: queryArg.pageSize,
          search: queryArg.search,
          writer: queryArg.writer,
        },
      }),
    }),
    agoraPostsCreate: build.mutation<
      AgoraPostsCreateApiResponse,
      AgoraPostsCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/agora/posts/`,
        method: "POST",
        body: queryArg.postRequest,
      }),
    }),
    agoraPostsRetrieve: build.query<
      AgoraPostsRetrieveApiResponse,
      AgoraPostsRetrieveApiArg
    >({
      query: (queryArg) => ({ url: `/agora/posts/${queryArg.id}/` }),
    }),
    agoraPostsUpdate: build.mutation<
      AgoraPostsUpdateApiResponse,
      AgoraPostsUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/agora/posts/${queryArg.id}/`,
        method: "PUT",
        body: queryArg.postRequest,
      }),
    }),
    agoraPostsPartialUpdate: build.mutation<
      AgoraPostsPartialUpdateApiResponse,
      AgoraPostsPartialUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/agora/posts/${queryArg.id}/`,
        method: "PATCH",
        body: queryArg.postRequest,
      }),
    }),
    agoraPostsDestroy: build.mutation<
      AgoraPostsDestroyApiResponse,
      AgoraPostsDestroyApiArg
    >({
      query: (queryArg) => ({
        url: `/agora/posts/${queryArg.id}/`,
        method: "DELETE",
      }),
    }),
    authPasswordUpdate: build.mutation<
      AuthPasswordUpdateApiResponse,
      AuthPasswordUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/auth/password/`,
        method: "PUT",
        body: queryArg.passwordServiceRequest,
      }),
    }),
    authProfileRetrieve: build.query<
      AuthProfileRetrieveApiResponse,
      AuthProfileRetrieveApiArg
    >({
      query: () => ({ url: `/auth/profile/` }),
    }),
    authProfileUpdate: build.mutation<
      AuthProfileUpdateApiResponse,
      AuthProfileUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/auth/profile/`,
        method: "PUT",
        body: queryArg.userRequest,
      }),
    }),
    authRefreshCreate: build.mutation<
      AuthRefreshCreateApiResponse,
      AuthRefreshCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/auth/refresh/`,
        method: "POST",
        body: queryArg.refreshServiceRequest,
      }),
    }),
    authSigninCreate: build.mutation<
      AuthSigninCreateApiResponse,
      AuthSigninCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/auth/signin/`,
        method: "POST",
        body: queryArg.signinServiceRequest,
      }),
    }),
    authSignoutCreate: build.mutation<
      AuthSignoutCreateApiResponse,
      AuthSignoutCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/auth/signout/`,
        method: "POST",
        body: queryArg.signoutServiceRequest,
      }),
    }),
    authSignupCreate: build.mutation<
      AuthSignupCreateApiResponse,
      AuthSignupCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/auth/signup/`,
        method: "POST",
        body: queryArg.signupServiceRequest,
      }),
    }),
    qnaAnswersList: build.query<
      QnaAnswersListApiResponse,
      QnaAnswersListApiArg
    >({
      query: (queryArg) => ({
        url: `/qna/answers/`,
        params: {
          cursor: queryArg.cursor,
          ordering: queryArg.ordering,
          page_size: queryArg.pageSize,
          post: queryArg.post,
          search: queryArg.search,
        },
      }),
    }),
    qnaAnswersCreate: build.mutation<
      QnaAnswersCreateApiResponse,
      QnaAnswersCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/qna/answers/`,
        method: "POST",
        body: queryArg.answerRequest,
      }),
    }),
    qnaAnswersRetrieve: build.query<
      QnaAnswersRetrieveApiResponse,
      QnaAnswersRetrieveApiArg
    >({
      query: (queryArg) => ({ url: `/qna/answers/${queryArg.id}/` }),
    }),
    qnaAnswersUpdate: build.mutation<
      QnaAnswersUpdateApiResponse,
      QnaAnswersUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/qna/answers/${queryArg.id}/`,
        method: "PUT",
        body: queryArg.answerRequest,
      }),
    }),
    qnaAnswersPartialUpdate: build.mutation<
      QnaAnswersPartialUpdateApiResponse,
      QnaAnswersPartialUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/qna/answers/${queryArg.id}/`,
        method: "PATCH",
        body: queryArg.answerRequest,
      }),
    }),
    qnaAnswersDestroy: build.mutation<
      QnaAnswersDestroyApiResponse,
      QnaAnswersDestroyApiArg
    >({
      query: (queryArg) => ({
        url: `/qna/answers/${queryArg.id}/`,
        method: "DELETE",
      }),
    }),
    qnaCommentsList: build.query<
      QnaCommentsListApiResponse,
      QnaCommentsListApiArg
    >({
      query: (queryArg) => ({
        url: `/qna/comments/`,
        params: {
          answer: queryArg.answer,
          comment: queryArg.comment,
          cursor: queryArg.cursor,
          ordering: queryArg.ordering,
          page_size: queryArg.pageSize,
          post: queryArg.post,
        },
      }),
    }),
    qnaCommentsCreate: build.mutation<
      QnaCommentsCreateApiResponse,
      QnaCommentsCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/qna/comments/`,
        method: "POST",
        body: queryArg.commentRequest,
        params: {
          answer: queryArg.answer,
          comment: queryArg.comment,
          post: queryArg.post,
        },
      }),
    }),
    qnaCommentsRetrieve: build.query<
      QnaCommentsRetrieveApiResponse,
      QnaCommentsRetrieveApiArg
    >({
      query: (queryArg) => ({ url: `/qna/comments/${queryArg.id}/` }),
    }),
    qnaCommentsUpdate: build.mutation<
      QnaCommentsUpdateApiResponse,
      QnaCommentsUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/qna/comments/${queryArg.id}/`,
        method: "PUT",
        body: queryArg.commentRequest,
      }),
    }),
    qnaCommentsPartialUpdate: build.mutation<
      QnaCommentsPartialUpdateApiResponse,
      QnaCommentsPartialUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/qna/comments/${queryArg.id}/`,
        method: "PATCH",
        body: queryArg.commentRequest,
      }),
    }),
    qnaCommentsDestroy: build.mutation<
      QnaCommentsDestroyApiResponse,
      QnaCommentsDestroyApiArg
    >({
      query: (queryArg) => ({
        url: `/qna/comments/${queryArg.id}/`,
        method: "DELETE",
      }),
    }),
    qnaPostsList: build.query<QnaPostsListApiResponse, QnaPostsListApiArg>({
      query: (queryArg) => ({
        url: `/qna/posts/`,
        params: {
          cursor: queryArg.cursor,
          field: queryArg.field,
          ordering: queryArg.ordering,
          page_size: queryArg.pageSize,
          search: queryArg.search,
          search_type: queryArg.searchType,
          tag: queryArg.tag,
          writer: queryArg.writer,
        },
      }),
    }),
    qnaPostsCreate: build.mutation<
      QnaPostsCreateApiResponse,
      QnaPostsCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/qna/posts/`,
        method: "POST",
        body: queryArg.postRequest,
      }),
    }),
    qnaPostsRetrieve: build.query<
      QnaPostsRetrieveApiResponse,
      QnaPostsRetrieveApiArg
    >({
      query: (queryArg) => ({ url: `/qna/posts/${queryArg.id}/` }),
    }),
    qnaPostsUpdate: build.mutation<
      QnaPostsUpdateApiResponse,
      QnaPostsUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/qna/posts/${queryArg.id}/`,
        method: "PUT",
        body: queryArg.postRequest,
      }),
    }),
    qnaPostsPartialUpdate: build.mutation<
      QnaPostsPartialUpdateApiResponse,
      QnaPostsPartialUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/qna/posts/${queryArg.id}/`,
        method: "PATCH",
        body: queryArg.postRequest,
      }),
    }),
    qnaPostsDestroy: build.mutation<
      QnaPostsDestroyApiResponse,
      QnaPostsDestroyApiArg
    >({
      query: (queryArg) => ({
        url: `/qna/posts/${queryArg.id}/`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as injectedApi };
export type AgoraLecturesListApiResponse =
  /** status 200  */ PaginatedLectureList;
export type AgoraLecturesListApiArg = {
  college?: string;
  major?: string;
  /** Which field to use when ordering the results. */
  ordering?: string;
  /** A page number within the paginated result set. */
  page?: number;
  /** Number of results to return per page. */
  pageSize?: number;
  /** A search term. */
  search?: string;
  season?: number;
  university?: string;
  year?: number;
};
export type AgoraLecturesRetrieveApiResponse = /** status 200  */ Lecture;
export type AgoraLecturesRetrieveApiArg = {
  /** A unique integer value identifying this lecture. */
  id: number;
};
export type AgoraPostsListApiResponse = /** status 200  */ PaginatedPostList;
export type AgoraPostsListApiArg = {
  /** The pagination cursor value. */
  cursor?: string;
  lecture?: number;
  /** Which field to use when ordering the results. */
  ordering?: string;
  /** Number of results to return per page. */
  pageSize?: number;
  /** A search term. */
  search?: string;
  writer?: number;
};
export type AgoraPostsCreateApiResponse = /** status 201  */ Post;
export type AgoraPostsCreateApiArg = {
  postRequest: PostRequest;
};
export type AgoraPostsRetrieveApiResponse = /** status 200  */ Post;
export type AgoraPostsRetrieveApiArg = {
  /** A unique integer value identifying this post. */
  id: number;
};
export type AgoraPostsUpdateApiResponse = /** status 200  */ Post;
export type AgoraPostsUpdateApiArg = {
  /** A unique integer value identifying this post. */
  id: number;
  postRequest: PostRequest;
};
export type AgoraPostsPartialUpdateApiResponse = /** status 200  */ Post;
export type AgoraPostsPartialUpdateApiArg = {
  /** A unique integer value identifying this post. */
  id: number;
  postRequest: PostRequest;
};
export type AgoraPostsDestroyApiResponse = unknown;
export type AgoraPostsDestroyApiArg = {
  /** A unique integer value identifying this post. */
  id: number;
};
export type AuthPasswordUpdateApiResponse = /** status 200  */ Success;
export type AuthPasswordUpdateApiArg = {
  passwordServiceRequest: PasswordServiceRequest;
};
export type AuthProfileRetrieveApiResponse = /** status 200  */ User;
export type AuthProfileRetrieveApiArg = void;
export type AuthProfileUpdateApiResponse = /** status 200  */ User;
export type AuthProfileUpdateApiArg = {
  userRequest: UserRequest;
};
export type AuthRefreshCreateApiResponse = /** status 200  */ RefreshToken;
export type AuthRefreshCreateApiArg = {
  refreshServiceRequest: RefreshServiceRequest;
};
export type AuthSigninCreateApiResponse = /** status 200  */ UserToken;
export type AuthSigninCreateApiArg = {
  signinServiceRequest: SigninServiceRequest;
};
export type AuthSignoutCreateApiResponse = /** status 200  */ Success;
export type AuthSignoutCreateApiArg = {
  signoutServiceRequest: SignoutServiceRequest;
};
export type AuthSignupCreateApiResponse = /** status 201  */ UserToken;
export type AuthSignupCreateApiArg = {
  signupServiceRequest: SignupServiceRequest;
};
export type QnaAnswersListApiResponse = /** status 200  */ PaginatedAnswerList;
export type QnaAnswersListApiArg = {
  /** The pagination cursor value. */
  cursor?: string;
  /** Which field to use when ordering the results. */
  ordering?: string;
  /** Number of results to return per page. */
  pageSize?: number;
  post?: number;
  /** A search term. */
  search?: string;
};
export type QnaAnswersCreateApiResponse = /** status 201  */ Answer;
export type QnaAnswersCreateApiArg = {
  answerRequest: AnswerRequest;
};
export type QnaAnswersRetrieveApiResponse = /** status 200  */ Answer;
export type QnaAnswersRetrieveApiArg = {
  /** A unique integer value identifying this answer. */
  id: number;
};
export type QnaAnswersUpdateApiResponse = /** status 200  */ Answer;
export type QnaAnswersUpdateApiArg = {
  /** A unique integer value identifying this answer. */
  id: number;
  answerRequest: AnswerRequest;
};
export type QnaAnswersPartialUpdateApiResponse = /** status 200  */ Answer;
export type QnaAnswersPartialUpdateApiArg = {
  /** A unique integer value identifying this answer. */
  id: number;
  answerRequest: AnswerRequest;
};
export type QnaAnswersDestroyApiResponse = unknown;
export type QnaAnswersDestroyApiArg = {
  /** A unique integer value identifying this answer. */
  id: number;
};
export type QnaCommentsListApiResponse =
  /** status 200  */ PaginatedCommentList;
export type QnaCommentsListApiArg = {
  /** Answer id */
  answer?: number;
  /** Comment id */
  comment?: number;
  /** The pagination cursor value. */
  cursor?: string;
  /** Which field to use when ordering the results. */
  ordering?: string;
  /** Number of results to return per page. */
  pageSize?: number;
  /** Post id */
  post?: number;
};
export type QnaCommentsCreateApiResponse = /** status 201  */ CommentAnswer;
export type QnaCommentsCreateApiArg = {
  /** Answer id */
  answer?: number;
  /** Comment id */
  comment?: number;
  /** Post id */
  post?: number;
  commentRequest: CommentRequest;
};
export type QnaCommentsRetrieveApiResponse = /** status 200  */ Comment;
export type QnaCommentsRetrieveApiArg = {
  /** A unique integer value identifying this comment. */
  id: number;
};
export type QnaCommentsUpdateApiResponse = /** status 200  */ Comment;
export type QnaCommentsUpdateApiArg = {
  /** A unique integer value identifying this comment. */
  id: number;
  commentRequest: CommentRequest;
};
export type QnaCommentsPartialUpdateApiResponse = /** status 200  */ Comment;
export type QnaCommentsPartialUpdateApiArg = {
  /** A unique integer value identifying this comment. */
  id: number;
  commentRequest: CommentRequest;
};
export type QnaCommentsDestroyApiResponse = unknown;
export type QnaCommentsDestroyApiArg = {
  /** A unique integer value identifying this comment. */
  id: number;
};
export type QnaPostsListApiResponse = /** status 200  */ PaginatedPostList;
export type QnaPostsListApiArg = {
  /** The pagination cursor value. */
  cursor?: string;
  field?: string;
  /** Which field to use when ordering the results. */
  ordering?: string;
  /** Number of results to return per page. */
  pageSize?: number;
  /** Search Parameters */
  search?: string;
  /** Customize search type with comma-seperate fields */
  searchType?: string;
  tag?: string;
  writer?: number;
};
export type QnaPostsCreateApiResponse = /** status 201  */ Post;
export type QnaPostsCreateApiArg = {
  postRequest: PostRequest;
};
export type QnaPostsRetrieveApiResponse = /** status 200  */ Post;
export type QnaPostsRetrieveApiArg = {
  /** A unique integer value identifying this post. */
  id: number;
};
export type QnaPostsUpdateApiResponse = /** status 200  */ Post;
export type QnaPostsUpdateApiArg = {
  /** A unique integer value identifying this post. */
  id: number;
  postRequest: PostRequest;
};
export type QnaPostsPartialUpdateApiResponse = /** status 200  */ Post;
export type QnaPostsPartialUpdateApiArg = {
  /** A unique integer value identifying this post. */
  id: number;
  postRequest: PostRequest;
};
export type QnaPostsDestroyApiResponse = unknown;
export type QnaPostsDestroyApiArg = {
  /** A unique integer value identifying this post. */
  id: number;
};
export type Lecture = {
  pk?: number;
  name: string;
  lecture_id: string;
  instructor: string;
  university?: string;
  college?: string;
  major?: string;
  semesters: string[];
};
export type PaginatedLectureList = {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: Lecture[];
};
export type UserPublic = {
  pk?: number;
  username: string;
  created_at?: string;
  last_login?: string | null;
};
export type Post = {
  pk?: number;
  lecture: string;
  writer?: UserPublic;
  title: string;
  content: string;
  created_at?: string;
  updated_at?: string;
};
export type PaginatedPostList = {
  next?: string | null;
  previous?: string | null;
  results?: Post[];
};
export type PostRequest = {
  lecture: string;
  title: string;
  content: string;
};
export type Success = {
  success: boolean;
};
export type PasswordServiceRequest = {
  old_password: string;
  new_password: string;
};
export type User = {
  pk?: number;
  email: string;
  username: string;
  birth_date?: string | null;
  self_introduction?: string;
  created_at?: string;
  last_login?: string | null;
};
export type UserRequest = {
  email: string;
  username: string;
  birth_date?: string | null;
  self_introduction?: string;
};
export type RefreshToken = {
  refresh: string;
};
export type RefreshServiceRequest = {
  refresh: string;
};
export type Token = {
  access: string;
  refresh: string;
};
export type UserToken = {
  user: User;
  token: Token;
};
export type SigninServiceRequest = {
  email: string;
  password: string;
};
export type SignoutServiceRequest = {
  refresh: string;
};
export type SignupServiceRequest = {
  email: string;
  username: string;
  password: string;
  birth_date?: string | null;
};
export type Answer = {
  pk?: number;
  post: number;
  writer?: UserPublic;
  content: string;
  created_at?: string;
  updated_at?: string;
};
export type PaginatedAnswerList = {
  next?: string | null;
  previous?: string | null;
  results?: Answer[];
};
export type AnswerRequest = {
  post: number;
  content: string;
};
export type Comment = {
  pk?: number;
  writer?: UserPublic;
  content: string;
  replies_count?: number;
  created_at?: string;
  updated_at?: string;
};
export type PaginatedCommentList = {
  next?: string | null;
  previous?: string | null;
  results?: Comment[];
};
export type CommentAnswer = {
  pk?: number;
  writer?: UserPublic;
  content: string;
  replies_count?: number;
  created_at?: string;
  updated_at?: string;
};
export type CommentRequest = {
  content_type?: number;
  object_id?: number;
  content: string;
};
