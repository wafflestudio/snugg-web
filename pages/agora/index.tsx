import { GetServerSideProps, NextPage } from "next";
import { queryToString } from "../../utility";

interface Props {
  content: string | null;
}

const AgoraSearchPage: NextPage<Props> = ({ content }) => {
  return <div>search: [{content}]</div>;
};

export default AgoraSearchPage;

AgoraSearchPage.displayName = "AgoraSearchPage";

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  return {
    props: {
      content: queryToString(context.query.q),
    },
  };
};
