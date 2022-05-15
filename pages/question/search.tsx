import { GetServerSideProps, NextPage } from "next";
import { queryToString } from "../../utility";
import QuestionSearchPage from "../../components/pages/question/QuestionSearchPage";
import { useAppSelector, wrapper } from "../../store";
import { listQna } from "../../store/qnaPosts";

interface Props {
  query: string;
}

const QuestionSearchPageContainer: NextPage<Props> = (props: Props) => {
  const posts = useAppSelector(state => state.qnaPosts.data?.results);
  return posts ? <QuestionSearchPage query={props.query} posts={posts} /> : <div>loading</div>;
};

export const getServerSideProps: GetServerSideProps<Props> = wrapper.getServerSideProps(store =>
  async (
  context
) => {
  await store.dispatch(listQna({})); // 일단 list로 둠
  const query = queryToString(context.query.q) ?? "";
  return {
    props: {
      query
    },
  };
});

export default QuestionSearchPageContainer;
