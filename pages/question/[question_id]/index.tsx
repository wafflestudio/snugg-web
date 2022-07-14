import { GetServerSideProps, NextPage } from "next";
import { queryToString } from "../../../utility";
import api, {
  AnswerPostInfo,
  PaginatedResponse,
  QuestionPost,
} from "../../../api";
import QuestionViewPage from "../../../components/pages/question/QuestionViewPage";

interface Props {
  questionId: number;
  questionData: QuestionPost;
  answerListData: PaginatedResponse<AnswerPostInfo>;
}

const QuestionViewPageContainer: NextPage<Props> = (Props: Props) => {
  return (
    <QuestionViewPage
      questionData={Props.questionData}
      answerNum={Props.answerListData.results.length}
      questionId={Props.questionId}
      answerListData={Props.answerListData}
    />
  );
};

export default QuestionViewPageContainer;

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const questionResponse = await api.getQuestion({
    id: Number(context.params?.question_id),
  });

  const answerListResponse = await api.getAnswersForQuestion({
    questionId: queryToString(context.params?.question_id) ?? "",
  });
  return {
    props: {
      questionData: questionResponse.data,
      questionId: Number(queryToString(context.params?.question_id)),
      answerListData: answerListResponse.data,
    },
  };
};
