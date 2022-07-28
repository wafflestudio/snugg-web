import React from "react";
import { queryToString } from "../../utility";
import { GetServerSideProps, NextPage } from "next";
import ProfilePage from "components/pages/profile/ProfilePage";
import { selectUserInfo, useAppSelector } from "store";
import api, { AnswerPostInfo, QuestionPost } from "api";

interface Props {
  userId: number;
  myQnaPosts: QuestionPost[];
  myQnaAnswers: AnswerPostInfo[];
}

const ProfilePageContainer: NextPage<Props> = ({
  userId,
  myQnaPosts,
  myQnaAnswers,
}) => {
  const profile = useAppSelector(selectUserInfo);
  if (profile) {
    return (
      <ProfilePage
        id={userId}
        profile={profile}
        myQnaPosts={myQnaPosts}
        myQnaAnswers={myQnaAnswers}
      />
    );
  } else {
    return <div>PLEASE LOGIN</div>;
  }
};
ProfilePageContainer.displayName = "ProfileComponent";
export default ProfilePageContainer;

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const userId = Number(queryToString(context.params?.user_id));
  const myQnaPosts = (await api.listQuestions({ writer: userId })).data.results;
  const myQnaAnswers = (await api.listAnswers({ writer: userId })).data.results;
  return {
    props: {
      userId: userId,
      myQnaPosts: myQnaPosts,
      myQnaAnswers: myQnaAnswers,
    },
  };
};
