import { GetServerSideProps, NextPage } from "next";
import { queryToString } from "../../utility";
import AgoraExplorePage from "../../components/pages/agora/AgoraExplorePage";
import AgoraSearchHeader from "../../components/reused/header/AgoraSearchHeader";

interface Props {
  query: string | null;
}

const AgoraIndexPageContainer: NextPage<Props> = ({ query }) => {
  return (
    <div>
      <AgoraSearchHeader query={query} />
      <AgoraExplorePage query={query} />
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
      query: queryToString(context.query.q),
    },
  };
};
