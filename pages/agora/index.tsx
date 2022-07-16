import { GetServerSideProps, NextPage } from "next";
import { queryToString } from "../../utility";
import AgoraExplorePage from "../../components/pages/agora/AgoraExplorePage";
import AgoraSearchHeader from "../../components/reused/header/AgoraSearchHeader";
import api, { AgoraLectureInfo } from "../../api";

interface Props {
  query: string | null;
  lectureInfos: AgoraLectureInfo[];
}

const AgoraIndexPageContainer: NextPage<Props> = ({ query, lectureInfos }) => {
  return (
    <div>
      <AgoraSearchHeader query={query} />
      <AgoraExplorePage query={query} lectureInfos={lectureInfos} />
    </div>
  );
};

export default AgoraIndexPageContainer;

AgoraIndexPageContainer.displayName = "AgoraSearchPage";

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const query = queryToString(context.query.q);
  const lectureInfos = (
    await api.listAgoraLecture(query ? { search: query } : {})
  ).data.results;
  return {
    props: {
      query,
      lectureInfos,
    },
  };
};
