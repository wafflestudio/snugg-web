import { GetServerSideProps, NextPage } from "next";
import { queryToString } from "../../utility";
import AgoraExplorePage from "../../components/pages/agora/AgoraExplorePage";
import AgoraSearchHeader from "../../components/reused/AgoraSearchHeader";

interface Props {
  content: string | null;
}

const AgoraIndexPageContainer: NextPage<Props> = ({ content }) => {
  return (
    <div>
      <AgoraSearchHeader content={content} />
      <AgoraExplorePage query={content} />
    </div>
  );
};

export default AgoraIndexPageContainer;

AgoraIndexPageContainer.displayName = "AgoraSearchPage";

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  return {
    props: {
      content: queryToString(context.query.q),
    },
  };
};
