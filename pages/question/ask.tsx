import { NextPage } from "next";
import QuestionAskPage from "../../components/pages/question/QuestionAskPage";

interface Props {}

const QuestionAskPageContainer: NextPage<Props> = () => {
  return <QuestionAskPage />;
};

// 고치기!
QuestionAskPageContainer.displayName = "QuestionPage";

export default QuestionAskPageContainer;
