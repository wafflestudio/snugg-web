import React, { useEffect } from "react";
import { useRouter } from "next/router";
import ProfileComponent from "../components/Body/ProfileComponent";

const Id = () => {
  const router = useRouter();
  const id = Number(router.query.id);

  return <ProfileComponent id={id} />;
};
Id.displayName = "ProfileComponent";
export default Id;
