import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Page: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace("/questions");
  });
  return null;
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/questions",
      permanent: true,
    },
  };
};

export default Page;
