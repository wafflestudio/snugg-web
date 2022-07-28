import { GetServerSideProps, NextPage } from "next";
import { nanToNull } from "../../../../utility";
import { AgoraPostPage } from "../../../../components/pages/agora/AgoraPostPage";
import api, { AgoraPostInfo } from "../../../../api";
import { toast } from "react-toastify";

interface Props {
  post: AgoraPostInfo;
}

const AgoraPostPageContainer: NextPage<Props> = ({ post }) => {
  return (
    <AgoraPostPage
      post={post}
      onSubmitComment={(comment) => {
        toast.warning(`구현되지 않음. comment: ${comment}`);
      }}
    />
  );
};

export default AgoraPostPageContainer;

export const getServerSideProps: GetServerSideProps<
  Props,
  { lecture_id: string; post_id: string }
> = async (context) => {
  const lectureId = nanToNull(Number(context.params?.lecture_id));
  const postId = nanToNull(Number(context.params?.post_id));
  if (lectureId === null || postId === null) return { notFound: true };
  const post = (await api.getAgoraPost(postId)).data;
  return {
    props: {
      post,
    },
  };
};
