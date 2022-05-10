import { GetServerSideProps, NextPage } from "next";
import { queryToString } from "../../../utility";
import { QuestionResponse } from "../../../api";
import axios from "axios";
import QuestionViewPage from "../../../components/pages/question/QuestionViewPage/QuestionViewPage";

interface Props {
  questionId: number;
  questionData: QuestionResponse;
}

const QuestionViewPageContainer: NextPage<Props> = (Props: Props) => {
  return <QuestionViewPage  questionData={Props.questionData} questionId={Props.questionId}/>;
};

export default QuestionViewPageContainer;

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const response = await axios.get(
    `http://54.180.123.137/qna/posts/${queryToString(
      context.params?.question_id
    )}`
  );
  //console.log(response);
  //하드코딩 안하니까 에러뜸..
  return {
    props: {
      questionData: response.data,

      questionId: Number(queryToString(context.params?.question_id)),
    },
  };
};
