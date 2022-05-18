import { GetServerSideProps, NextPage } from "next";
import { queryToString } from "../../../utility";
import {
  AgoraListPage,
} from "../../../components/pages/agora/AgoraListPage";
import { useRouter } from "next/router";

interface Props {
  className: string;
}

const AgoraListPageContainer: NextPage<Props> = ({ className }) => {
  const router = useRouter();
  const onSearch = (condition: string, query: string) => {
    router.push(`/agora/${className}?` + new URLSearchParams({type: condition, query}).toString()).then();
  }
  return <AgoraListPage className={className} onSearch={onSearch} />;
};

export default AgoraListPageContainer;

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  return {
    props: {
      className: queryToString(context.params?.class_name) ?? "",
    },
  };
};
