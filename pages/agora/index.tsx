import { GetServerSideProps, NextPage } from "next";
import { queryToString } from "../../utility";
import AgoraExplorePage from "../../components/legacy_pages/AgoraExplorePage";
import AgoraSearchResultPage from "../../components/legacy_pages/AgoraSearchResultPage";
import AgoraSearchHeader from "../../components/reused/AgoraSearchHeader";

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
