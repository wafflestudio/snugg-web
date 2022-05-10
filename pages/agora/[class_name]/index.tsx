import { GetServerSideProps, NextPage } from "next";
import { queryToString } from "../../../utility";
import { AgoraListPage, Props } from "../../../components/pages/agora/AgoraListPage";

const AgoraListPageContainer: NextPage<Props> = ({className}) => {
  return <AgoraListPage className={className}/>;
}

export default AgoraListPageContainer;

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  return {
    props: {
      className: queryToString(context.params?.class_name),
    },
  };
};
