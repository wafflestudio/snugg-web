import { GetServerSideProps, NextPage } from "next";
import { nanToNull } from "../../../utility";
import { AgoraPostPage } from "../../../components/pages/agora/AgoraPostPage";
import { wrapper } from "../../../store";
import { enhancedApi, pendingQueries } from "../../../store/api/enhanced";

interface Props {
  id: number;
}

const AgoraPostPageContainer: NextPage<Props> = ({ id }) => {
  return <AgoraPostPage id={id} />;
};

export default AgoraPostPageContainer;

export const getServerSideProps: GetServerSideProps<Props> =
  wrapper.getServerSideProps<Props>((store) => async (context) => {
    const postId = nanToNull(Number(context.params?.post_id));
    if (postId === null) return { notFound: true };
    store.dispatch(
      enhancedApi.endpoints.agoraStorysRetrieve.initiate({ id: postId })
    );
    await pendingQueries();
    return {
      props: {
        id: postId,
      },
    };
  });
