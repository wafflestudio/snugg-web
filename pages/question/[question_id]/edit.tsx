import { NextPage } from "next";

import React from "react";
import QuestionEditPage from "../../../components/pages/question/QuestionEditPage";

interface Props {}

const QuestionEditPageContainer: NextPage<Props> = () => {
  return <QuestionEditPage />;
};

QuestionEditPageContainer.displayName = "QuestionEditPage";

export default QuestionEditPageContainer;
