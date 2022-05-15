import type { NextPage } from "next";
import { useAppSelector, wrapper } from "../../store";
import { listQna } from "../../store/qnaPosts";
import QuestionIndexPage from "../../components/pages/question/QuestionIndexPage";

const QuestionIndexPageContainer: NextPage = () => {
  const posts = useAppSelector((state) => state.qnaPosts.data?.results);
  const loading = useAppSelector((state) => state.qnaPosts.loading);
  return loading ? (
    <div>loading...</div>
  ) : posts ? (
    <QuestionIndexPage posts={posts} />
  ) : (
    <div>error</div>
  );
  //로그인 로직 추후 추가
};

QuestionIndexPageContainer.getInitialProps = wrapper.getInitialPageProps(
  (store) => async () => {
    await store.dispatch(listQna({}));
  }
);

QuestionIndexPageContainer.displayName = "Home";

export default QuestionIndexPageContainer;
