import { GetServerSideProps, NextPage } from "next";
import { nanToNull } from "../../../utility";
import { AgoraListPage } from "../../../components/pages/agora/AgoraListPage";
import { useRouter } from "next/router";
import api, { AgoraPostInfo } from "../../../api";

interface Props {
  lectureId: number;
  posts: AgoraPostInfo[];
}

const AgoraListPageContainer: NextPage<Props> = ({ lectureId, posts }) => {
  const router = useRouter();
  const onSearch = (condition: string, query: string) => {
    router
      .push(
        `/agora/${lectureId}?` +
        new URLSearchParams({ type: condition, query }).toString()
      )
      .then();
  };
  return <AgoraListPage onSearch={onSearch} posts={posts} />;
};

export default AgoraListPageContainer;

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const lectureId = nanToNull(Number(context.params?.lecture_id));
  if (lectureId == null) {
    return { notFound: true };
  }
  const posts = (await api.listAgoraPost({ lecture: lectureId })).data.results;
  return {
    props: {
      lectureId, posts
    }
  };
};
