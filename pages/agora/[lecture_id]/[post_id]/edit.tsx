import axios from "axios";
import { GetServerSideProps, NextPage } from "next";

import React from "react";
import { QuestionPostInfo } from "../../../../api";
import AgoraPostEditPage from "../../../../components/pages/agora/AgoraPostEditPage";
import { nanToNull, queryToString } from "../../../../utility";

interface Props {
  questionId: string;
  questionData: QuestionPostInfo;
}

const AgoraPostEditPageContainer: NextPage<Props> = (Props: Props) => {
  return <AgoraPostEditPage lectureId={1} />;
};

// export const getServerSideProps: GetServerSideProps<Props> = async (
//   context
// ) => {
//   const response = await axios.get(
//     `http://54.180.123.137/qna/posts/${queryToString(
//       context.params?.question_id
//     )}`
//   );
//   return {
//     props: {
//       questionData: response.data,
//       questionId: queryToString(context.params?.question_id) ?? "",
//     },
//   };
// };

export default AgoraPostEditPageContainer;
