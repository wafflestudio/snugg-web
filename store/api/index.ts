import { injectedApi } from "./injected";

enum Tag {
  QnaPosts = "QnaPosts",
  Answer = "Answer",
  AnswerList = "AnswerList",
}

const enhancedApi = injectedApi.enhanceEndpoints<Tag>({
  endpoints: {
    qnaAnswersCreate: {
      invalidatesTags: (result) =>
        result ? [{ id: result.post, type: Tag.AnswerList }] : [],
    },
    qnaAnswersUpdate: {
      invalidatesTags: (result) =>
        result ? [{ id: result.pk, type: Tag.Answer }] : [],
    },
    qnaAnswersDestroy: {
      invalidatesTags: (_r, _e, args) =>
        _r ? [{ id: args.id, type: Tag.Answer }] : [],
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
  },
});

// for compatibility
export const apiStore = enhancedApi;
export const api = enhancedApi;
