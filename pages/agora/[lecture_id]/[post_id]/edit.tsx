import axios from "axios";
import { GetServerSideProps, NextPage } from "next";

import React from "react";
import api, { AgoraPostInfo, QuestionPostInfo } from "../../../../api";
import AgoraPostEditPage from "../../../../components/pages/agora/AgoraPostEditPage";
import { nanToNull, queryToString } from "../../../../utility";

interface Props {
  post: AgoraPostInfo;
}

const AgoraPostEditPageContainer: NextPage<Props> = (Props: Props) => {
  return <AgoraPostEditPage post={Props.post} />;
};

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

export default AgoraPostEditPageContainer;
