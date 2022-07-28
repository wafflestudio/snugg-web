import type { NextPage } from "next";
import { wrapper } from "../../store";
import QuestionIndexPage from "../../components/pages/question/QuestionIndexPage";
import { enhancedApi, pendingQueries } from "../../store/api/enhanced";
import { useQnaPostsListQuery } from "../../store/api/injected";

const QuestionIndexPageContainer: NextPage = () => {
  const { data, error } = useQnaPostsListQuery({});
  if (error) {
    return <div>error</div>;
  } else if (!data) {
    return <div>loading...</div>;
  } else {
    return <QuestionIndexPage posts={data.results!!} />;
  }
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    store.dispatch(enhancedApi.endpoints.qnaPostsList.initiate({}));
    await pendingQueries();
    return {
      props: {},
    };
  }
);

QuestionIndexPageContainer.displayName = "Home";

export default QuestionIndexPageContainer;
