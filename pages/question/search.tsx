import { GetServerSideProps, NextPage } from "next";
import { queryToString } from "../../utility";
import QuestionSearchPage from "../../components/pages/question/QuestionSearchPage";
import { useAppSelector, wrapper } from "../../store";
import { listQna } from "../../store/qnaPosts";

interface Props {
  content: string;
}

const QuestionSearchPageContainer: NextPage<Props> = ({ content }) => {
  const posts = useAppSelector((state) => state.qnaPosts.data?.results);
  return posts ? (
    <QuestionSearchPage query={content} posts={posts} />
  ) : (
    <div>loading</div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> =
  wrapper.getServerSideProps((store) => async (context) => {
    const content = queryToString(context.query.content) ?? "";
    await store.dispatch(listQna({ search: content })); // 일단 list로 둠
    return {
      props: {
        content,
      },
    };
  });

export default QuestionSearchPageContainer;
