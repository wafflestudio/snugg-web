import { GetServerSideProps, NextPage } from "next";
import { nanToNull } from "../../../utility";
import { AgoraListPage } from "../../../components/pages/agora/AgoraListPage";
import { useRouter } from "next/router";
import api, { AgoraLectureInfo, AgoraPostInfo } from "../../../api";

interface Props {
  posts: AgoraPostInfo[];
  lecture: AgoraLectureInfo;
}

const AgoraListPageContainer: NextPage<Props> = ({ posts, lecture }) => {
  const router = useRouter();
  const onSearch = (condition: string, query: string) => {
    router
      .push(
        `/agora/${lecture.pk}?` +
          new URLSearchParams({ type: condition, query }).toString()
      )
      .then();
  };
  return <AgoraListPage onSearch={onSearch} posts={posts} lecture={lecture} />;
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
  const lecture = (await api.getAgoraLecture(lectureId)).data;
  return {
    props: {
      lectureId,
      posts,
      lecture,
    },
  };
};
