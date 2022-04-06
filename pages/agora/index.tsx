import { GetServerSideProps, NextPage } from "next";
import { queryToString } from "../../utility";
import AgoraExplorePage from "../../components/Body/AgoraExplorePage";
import AgoraSearchResultPage from "../../components/Body/AgoraSearchResultPage";
import AgoraSearchHeader from "../../components/Header/AgoraSearchHeader";

interface Props {
  content: string | null;
}

const AgoraSearchPage: NextPage<Props> = ({ content }) => {
  return (
    <div>
      <AgoraSearchHeader content={content} />
      {content === null || content === "" ? (
        <AgoraExplorePage />
      ) : (
        <AgoraSearchResultPage />
      )}
    </div>
  );
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
