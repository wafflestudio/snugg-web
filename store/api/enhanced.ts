import { injectedApi } from "./injected";
import { apiUser } from "./apiUser";

enum Tag {
  QnaPosts = "QnaPosts",
  Answer = "Answer",
  AnswerList = "AnswerList",
}

export const enhancedApi = injectedApi.enhanceEndpoints<Tag>({
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
    qnaAnswersPartialUpdate: {
      invalidatesTags: (result) =>
        result ? [{ id: result.pk, type: Tag.Answer }] : [],
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
