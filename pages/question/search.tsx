import { GetServerSideProps, NextPage } from "next";
import { queryToString } from "../../utility";
import QuestionSearchPage from "../../components/pages/question/QuestionSearchPage";

interface Props {
  content: string | null;
}

const QuestionSearchPageContainer: NextPage<Props> = (props: Props) => {
  return <QuestionSearchPage content={props.content} />;
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  return {
    props: {
      content: queryToString(context.query.q),
    },
  };
};

export default QuestionSearchPageContainer;
