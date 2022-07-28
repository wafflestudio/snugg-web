import { injectedApi, Post, User } from "./injected";
import { apiUser } from "./apiUser";

enum Tag {
  QnaPosts = "QnaPosts",
  Answer = "Answer",
  AnswerList = "AnswerList",
}

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
      qnaPostsAcceptAnswer: {
        invalidatesTags: (result) =>
          result ? [{ id: result.pk, type: Tag.AnswerList }] : [],
      },
      qnaAnswersCreate: {
        invalidatesTags: (result) =>
          result ? [{ id: result.post, type: Tag.AnswerList }] : [],
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
          { id: args.post, type: Tag.AnswerList },
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
