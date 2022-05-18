import { GetServerSideProps, NextPage } from "next";
import { queryToString } from "../../../utility";
import { AgoraPostPage } from "../../../components/pages/agora/AgoraPostPage";

interface Props {
  className: string | null;
  postId: number;
}

const AgoraPostPageContainer: NextPage<Props> = ({ className, postId }) => {
  return (
    <AgoraPostPage
      postId={postId}
      className={className}
      onSubmitComment={(comment: string) => {
        alert(`comment: ${comment}`);
      }}
    />
  );
};

export default AgoraPostPageContainer;

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  return {
    props: {
      className: queryToString(context.params?.class_name),
      postId: Number(queryToString(context.params?.post_id)),
    },
  };
};
