import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Page: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace("/question");
  });
  return null;
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/question",
      permanent: true,
    },
  };
};

export default Page;
