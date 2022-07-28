import { NextPage } from "next";
import api, { ListCommentInfo } from "../../../api";
import { nanToNull, queryToString } from "../../../utility";
import QuestionViewPage from "../../../components/pages/question/QuestionViewPage";
import { enhancedApi, pendingQueries } from "../../../store/api/enhanced";
import { wrapper } from "../../../store";

interface Props {
  questionId: number;
  commentData: ListCommentInfo;
}

const QuestionViewPageContainer: NextPage<Props> = ({
  questionId,
  commentData,
}) => {
  return <QuestionViewPage questionId={questionId} commentData={commentData} />;
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
    await pendingQueries();
    const questionComments = await api.listComment(
      "post",
      Number(context.params?.question_id)
    );
    return {
      props: {
        questionId: id,
        commentData: questionComments.data,
      },
    };
  }
);
