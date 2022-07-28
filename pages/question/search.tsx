import { GetServerSideProps, NextPage } from "next";
import { queryToString } from "../../utility";
import QuestionSearchPage from "../../components/pages/question/QuestionSearchPage";
import { wrapper } from "../../store";
import { enhancedApi, pendingQueries } from "../../store/api/enhanced";
import { useQnaPostsListQuery } from "../../store/api/injected";

interface Props {
  content: string;
}

const QuestionSearchPageContainer: NextPage<Props> = ({ content }) => {
  const { data } = useQnaPostsListQuery({ search: content });
  return data ? (
    <QuestionSearchPage query={content} posts={data.results!} />
  ) : (
    <div>loading</div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> =
  wrapper.getServerSideProps((store) => async (context) => {
    const content = queryToString(context.query.content) ?? "";
    store.dispatch(
      enhancedApi.endpoints.qnaPostsList.initiate({ search: content })
    );
    await pendingQueries();
    return {
      props: {
        content,
      },
    };
  });

export default QuestionSearchPageContainer;
