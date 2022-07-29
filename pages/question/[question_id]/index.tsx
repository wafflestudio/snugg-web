import { NextPage } from "next";
import { nanToNull, queryToString } from "../../../utility";
import QuestionViewPage from "../../../components/pages/question/QuestionViewPage";
import { enhancedApi, pendingQueries } from "../../../store/api/enhanced";
import { wrapper } from "../../../store";

interface Props {
  questionId: number;
}

const QuestionViewPageContainer: NextPage<Props> = ({ questionId }) => {
  return <QuestionViewPage questionId={questionId} />;
};

export default QuestionViewPageContainer;

export const getServerSideProps = wrapper.getServerSideProps<Props>(
  (store) => async (context) => {
    const id = nanToNull(Number(queryToString(context.params?.question_id)));
    if (id === null) {
      return {
        notFound: true,
      };
    }
    store.dispatch(enhancedApi.endpoints.qnaPostsRetrieve.initiate({ id }));
    store.dispatch(enhancedApi.endpoints.qnaAnswersList.initiate({ post: id }));
    store.dispatch(
      enhancedApi.endpoints.qnaCommentsList.initiate({ post: id })
    );
    await pendingQueries();
    return {
      props: {
        questionId: id,
      },
    };
  }
);
