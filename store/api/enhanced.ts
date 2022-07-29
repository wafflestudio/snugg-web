import { injectedApi, Post, User } from "./injected";
import { apiUser } from "./apiUser";

enum Tag {
  Answer = "Answer",
  Story = "Story",
  Profile = "Profile",
  Comment = "Comment",
  Post = "Post",
}

const LIST = (extra: number | string = "") => `LIST(${extra})`;

export type QnaPostsAcceptAnswerArgs = {
  id: number;
  accepted_answer: number;
};
export type QnaPostsAcceptAnswerResponse = Post;
export type PresignedPostFields = {
  key: string;
} & Record<string, any>;
export type PresignedPost = {
  url: string;
  fields: PresignedPostFields;
};
export type Directory = {
  pk: number;
  uploader: User;
  path: string;
  filenames: string[];
  created_at: string;
  presigned_posts: PresignedPost[];
};
export type MediaPresignedCreateApiResponse = /** status 201  */ Directory;
export type DirectoryRequest = {
  filenames: string[];
};
export type MediaPresignedCreateApiArg = {
  directoryRequest: DirectoryRequest;
};
export const enhancedApi = injectedApi
  .injectEndpoints({
    endpoints: (build) => ({
      qnaPostsAcceptAnswer: build.mutation<
        QnaPostsAcceptAnswerResponse,
        QnaPostsAcceptAnswerArgs
      >({
        query: (arg) => ({
          url: `/qna/posts/${arg.id}`,
          method: "PATCH",
          body: { accepted_answer: arg.accepted_answer },
        }),
      }),
      mediaPresignedCreate: build.mutation<
        MediaPresignedCreateApiResponse,
        MediaPresignedCreateApiArg
      >({
        query: (queryArg) => ({
          url: `/media/presigned/`,
          method: "POST",
          body: queryArg.directoryRequest,
        }),
      }),
    }),
  })
  .enhanceEndpoints<Tag>({
    endpoints: {
      agoraStorysCreate: {
        invalidatesTags: (result) =>
          result ? [{ id: LIST(), type: Tag.Story }] : [],
      },
      agoraStorysUpdate: {
        invalidatesTags: (result) =>
          result ? [{ id: result.pk, type: Tag.Story }] : [],
      },
      agoraStorysDestroy: {
        invalidatesTags: (result, _e, args) =>
          result ? [{ id: args.id, type: Tag.Story }] : [],
      },
      agoraStorysList: {
        providesTags: (result) => [
          { id: LIST(), type: Tag.Story },
          ...(result?.results?.map((e) => ({
            id: e.pk,
            type: Tag.Story,
          })) ?? []),
        ],
      },
      agoraStorysRetrieve: {
        providesTags: (_r, _e, args) => [{ id: args.id, type: Tag.Story }],
      },
      authProfileRetrieve: {
        providesTags: [Tag.Profile],
        onQueryStarted: async (_args, { queryFulfilled, dispatch }) => {
          const { data } = await queryFulfilled;
          dispatch(apiUser.actions.setProfile(data));
        },
      },
      authProfileUpdate: {
        invalidatesTags: [Tag.Profile],
        onQueryStarted: async (_args, { queryFulfilled, dispatch }) => {
          const { data } = await queryFulfilled;
          dispatch(apiUser.actions.setProfile(data));
        },
      },
      qnaCommentsCreate: {
        invalidatesTags: (result) =>
          result ? [{ id: LIST(), type: Tag.Comment }] : [],
      },
      qnaCommentsUpdate: {
        invalidatesTags: (result) =>
          result ? [{ id: result.pk, type: Tag.Comment }] : [],
      },
      qnaCommentsDestroy: {
        invalidatesTags: (result, _e, args) =>
          result
            ? [
                { id: LIST(), type: Tag.Comment },
                { id: args.id, type: Tag.Comment },
              ]
            : [],
      },
      qnaCommentsList: {
        providesTags: (result) => [
          { id: LIST(), type: Tag.Comment },
          ...(result?.results?.map((e) => ({
            id: e.pk,
            type: Tag.Comment,
          })) ?? []),
        ],
      },
      qnaCommentsRetrieve: {
        providesTags: (_r, _e, args) => [{ id: args.id, type: Tag.Comment }],
      },
      qnaPostsCreate: {
        invalidatesTags: (result) =>
          result ? [{ id: LIST(), type: Tag.Post }] : [],
      },
      qnaPostsUpdate: {
        invalidatesTags: (result) =>
          result ? [{ id: result.pk, type: Tag.Post }] : [],
      },
      qnaPostsDestroy: {
        invalidatesTags: (result, _e, args) =>
          result
            ? [
                { id: LIST(), type: Tag.Post },
                { id: args.id, type: Tag.Post },
              ]
            : [],
      },
      qnaPostsAcceptAnswer: {
        invalidatesTags: (result) =>
          result ? [{ id: LIST(result.pk), type: Tag.Answer }] : [],
      },
      qnaPostsList: {
        providesTags: (result) => [
          { id: LIST(), type: Tag.Post },
          ...(result?.results?.map((e) => ({
            id: e.pk,
            type: Tag.Post,
          })) ?? []),
        ],
      },
      qnaPostsRetrieve: {
        providesTags: (_r, _e, args) => [{ id: args.id, type: Tag.Post }],
      },
      qnaAnswersCreate: {
        invalidatesTags: (result) =>
          result ? [{ id: LIST(result.post), type: Tag.Answer }] : [],
      },
      qnaAnswersUpdate: {
        invalidatesTags: (result) =>
          result ? [{ id: result.pk, type: Tag.Answer }] : [],
      },
      qnaAnswersDestroy: {
        invalidatesTags: (result, _e, args) =>
          result ? [{ id: args.id, type: Tag.Answer }] : [],
      },
      qnaAnswersRetrieve: {
        providesTags: (_r, _e, args) => [{ id: args.id, type: Tag.Answer }],
      },
      qnaAnswersList: {
        providesTags: (result, _e, args) => [
          { id: LIST(args.post), type: Tag.Answer },
          ...(result?.results?.map((e) => ({
            id: e.pk,
            type: Tag.Answer,
          })) ?? []),
        ],
      },
      authSigninCreate: {
        onQueryStarted: async (_arg, { queryFulfilled, dispatch }) => {
          const { data } = await queryFulfilled;
          dispatch(apiUser.actions.setUser(data));
        },
      },
      authSignoutCreate: {
        onQueryStarted: async (_arg, { queryFulfilled, dispatch }) => {
          await queryFulfilled;
          dispatch(apiUser.actions.setUser(undefined));
        },
      },
      authSignupCreate: {
        onQueryStarted: async (_arg, { queryFulfilled, dispatch }) => {
          const { data } = await queryFulfilled;
          dispatch(apiUser.actions.setUser(data));
        },
      },
    },
  });

export const pendingQueries = () =>
  Promise.all(enhancedApi.util.getRunningOperationPromises());

export const {
  useQnaPostsAcceptAnswerMutation,
  useMediaPresignedCreateMutation,
} = enhancedApi;
