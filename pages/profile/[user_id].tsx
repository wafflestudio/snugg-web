import React from "react";
import { queryToString } from "../../utility";
import { GetServerSideProps, NextPage } from "next";
import ProfilePage from "components/pages/profile/ProfilePage";
import { selectUserInfo, useAppSelector } from "store";

interface Props {
  userId: number;
}

const ProfilePageContainer: NextPage<Props> = ({ userId }) => {
  const profile = useAppSelector(selectUserInfo);
  if (profile) {
    return <ProfilePage id={userId} profile={profile} />;
  } else {
    return <div>PLEASE LOGIN</div>;
  }
};
ProfilePageContainer.displayName = "ProfileComponent";
export default ProfilePageContainer;

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  return {
    props: {
      userId: Number(queryToString(context.params?.user_id)),
    },
  };
};
