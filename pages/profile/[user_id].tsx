import React from "react";
import ProfileComponent from "../../components/legacy_pages/ProfileComponent";
import { queryToString } from "../../utility";
import { GetServerSideProps, NextPage } from "next";

interface Props {
  userId: number;
}

const ProfilePage: NextPage<Props> = ({ userId }) => {
  return <ProfileComponent id={userId} />;
};
ProfilePage.displayName = "ProfileComponent";
export default ProfilePage;

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  return {
    props: {
      userId: Number(queryToString(context.params?.user_id)),
    },
  };
};
