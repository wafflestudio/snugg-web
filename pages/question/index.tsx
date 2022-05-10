import type { NextPage } from "next";
import MainPage from "../../components/pages/question/QuestionIndexPage/QuestionIndexPage";

const QuestionIndexPageContainer: NextPage = () => {
  return <MainPage />; //로그인 로직 추후 추가
};

QuestionIndexPageContainer.displayName = "Home";

export default QuestionIndexPageContainer;
