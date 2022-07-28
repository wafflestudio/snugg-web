import { GetServerSideProps, NextPage } from "next";
import { queryToString } from "../../utility";
import AgoraExplorePage from "../../components/pages/agora/AgoraExplorePage";
import AgoraSearchHeader from "../../components/reused/header/AgoraSearchHeader";
import { wrapper } from "../../store";
import { enhancedApi, pendingQueries } from "../../store/api/enhanced";

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

export const getServerSideProps: GetServerSideProps<Props> =
  wrapper.getServerSideProps<Props>((store) => async (context) => {
    const query = queryToString(context.query.q);
    store.dispatch(
      enhancedApi.endpoints.agoraLecturesList.initiate(
        query ? { search: query } : {}
      )
    );
    await pendingQueries();
    return {
      props: {
        query,
      },
    };
  });
