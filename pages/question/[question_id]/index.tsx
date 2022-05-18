import { GetServerSideProps, NextPage } from "next";
import { queryToString } from "../../../utility";
import { QuestionPost } from "../../../api";
import axios from "axios";
import QuestionViewPage from "../../../components/pages/question/QuestionViewPage";
import { useEffect } from "react";

interface Props {
  questionId: number;
  questionData: QuestionPost;
}

const QuestionViewPageContainer: NextPage<Props> = (Props: Props) => {
  return (
    <QuestionViewPage
      questionData={Props.questionData}
      questionId={Props.questionId}
    />
  );
};

export default QuestionViewPageContainer;

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const questionResponse = await axios.get(
    `http://54.180.123.137/qna/posts/${queryToString(
      context.params?.question_id
    )}`
  );
  /*const answerResponse = await axios.get(
    `http://54.180.123.137/qna/answers/${queryToString(
      context.params?.question_id
    )}`
  );
  console.log(questionResponse.data);
  console.log(answerResponse.data);*/
  //하드코딩 안하니까 에러뜸..
  return {
    props: {
      questionData: questionResponse.data,
      questionId: Number(queryToString(context.params?.question_id)),
    },
  };
};
