import { NextPage } from "next";
import { nanToNull } from "../../../utility";
import { AgoraListPage } from "../../../components/pages/agora/AgoraListPage";
import { useRouter } from "next/router";
import { enhancedApi, pendingQueries } from "../../../store/api/enhanced";
import { wrapper } from "../../../store";

interface Props {
  lectureId: number;
}

const AgoraListPageContainer: NextPage<Props> = ({ lectureId }) => {
  const router = useRouter();
  const onSearch = (condition: string, query: string) => {
    router
      .push(
        `/agora/${lectureId}?` +
          new URLSearchParams({ type: condition, query }).toString()
      )
      .then();
  };
  return <AgoraListPage onSearch={onSearch} lectureId={lectureId} />;
};

export default AgoraListPageContainer;

export const getServerSideProps = wrapper.getServerSideProps<Props>((_store) => async (context) => {
  const lectureId = nanToNull(Number(context.params?.lecture_id));
  if (lectureId == null) {
    return { notFound: true };
  }
  enhancedApi.endpoints.agoraStorysList.initiate({ lecture: lectureId });
  enhancedApi.endpoints.agoraLecturesRetrieve.initiate({ id: lectureId });
  await pendingQueries();
  return {
    props: {
      lectureId,
    },
  };
});