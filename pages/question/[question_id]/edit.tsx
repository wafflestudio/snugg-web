import { GetServerSideProps, NextPage } from "next";

import React from "react";
import QuestionEditPage from "../../../components/pages/question/QuestionEditPage";
import { nanToNull, queryToString } from "../../../utility";

interface Props {
  questionId: string;
}

const QuestionEditPageContainer: NextPage<Props> = ({questionId}) => {
  return <QuestionEditPage postId={nanToNull(Number(questionId))} />;
};

QuestionEditPageContainer.displayName = "QuestionEditPage";

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  return {
    props: {
      questionId: queryToString(context.params?.question_id) ?? ""
    }
  }
}

export default QuestionEditPageContainer;
