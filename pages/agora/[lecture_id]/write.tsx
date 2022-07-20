import { GetServerSideProps, NextPage } from "next";
import api, { AgoraLectureInfo } from "../../../api";
import AgoraWritePage from "../../../components/pages/agora/AgoraWritePage";
import { nanToNull } from "../../../utility";

interface Props {
  lectureId: number;
  lecture: AgoraLectureInfo;
}

const AgoraWritePageContainer: NextPage<Props> = ({ lectureId, lecture }) => {
  return <AgoraWritePage lectureId={lectureId} lecture={lecture} />;
};

export default AgoraWritePageContainer;

export const getServerSideProps: GetServerSideProps<
  Props,
  { lecture_id: string }
> = async (context) => {
  const lectureId = nanToNull(Number(context.params?.lecture_id));
  if (lectureId === null) return { notFound: true };
  const lecture = (await api.getAgoraLecture(lectureId)).data;
  return {
    props: {
      lectureId,
      lecture,
    },
  };
};
