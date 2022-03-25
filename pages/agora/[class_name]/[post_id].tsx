import { GetServerSideProps, NextPage } from "next";
import { queryToString } from "../../../utility";

interface Props {
  className: string | null;
  postId: number;
}

const AgoraPostPage: NextPage<Props> = ({ className, postId }) => {
  return (
    <div>
      class name: [{className}], post id: [{postId}]
    </div>
  );
};

export default AgoraPostPage;

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
