import { NextPage } from "next";

import React from "react";
import AgoraPostEditPage from "../../../../components/pages/agora/AgoraPostEditPage";
import { nanToNull} from "../../../../utility";
import { wrapper } from "../../../../store";
import { enhancedApi, pendingQueries } from "../../../../store/api/enhanced";
import { useAgoraStorysRetrieveQuery } from "../../../../store/api/injected";

interface Props {
  id: number;
}

const AgoraPostEditPageContainer: NextPage<Props> = ({ id }: Props) => {
  const { data, error } = useAgoraStorysRetrieveQuery({ id });
  return data ? (
    <AgoraPostEditPage post={data} />
  ) : error ? (
    <div>error</div>
  ) : (
    <div>loading</div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps<Props>(
  (store) => async (context) => {
    const lectureId = nanToNull(Number(context.params?.lecture_id));
    const postId = nanToNull(Number(context.params?.post_id));
    if (lectureId === null || postId === null) return { notFound: true };
    store.dispatch(
      enhancedApi.endpoints.agoraStorysRetrieve.initiate({ id: postId })
    );
    await pendingQueries();
    return {
      props: {
        id: postId,
      },
    };
  }
);

export default AgoraPostEditPageContainer;
