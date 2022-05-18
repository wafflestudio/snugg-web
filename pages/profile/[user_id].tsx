import React from "react";
import ProfilePage from "../../components/pages/profile";
import { queryToString } from "../../utility";
import { GetServerSideProps, NextPage } from "next";

interface Props {
  userId: number;
}

const ProfilePageContainer: NextPage<Props> = ({ userId }) => {
  return <ProfilePage id={userId} />;
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
