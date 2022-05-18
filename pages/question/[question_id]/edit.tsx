import axios from "axios";
import { GetServerSideProps, NextPage } from "next";

import React from "react";
import { QuestionPost } from "../../../api";
import QuestionEditPage from "../../../components/pages/question/QuestionEditPage";
import { nanToNull, queryToString } from "../../../utility";

interface Props {
  questionId: string;
  questionData: QuestionPost;
}

const QuestionEditPageContainer: NextPage<Props> = (Props: Props) => {
  return (
    <QuestionEditPage
      postId={nanToNull(Number(Props.questionId))}
      questionData={Props.questionData}
    />
  );
};

QuestionEditPageContainer.displayName = "QuestionEditPage";

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const response = await axios.get(
    `http://54.180.123.137/qna/posts/${queryToString(
      context.params?.question_id
    )}`
  );
  return {
    props: {
      questionData: response.data,
      questionId: queryToString(context.params?.question_id) ?? "",
    },
  };
};

export default QuestionEditPageContainer;
