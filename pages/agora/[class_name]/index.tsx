import { GetServerSideProps, NextPage } from "next";
import { queryToString } from "../../../utility";

interface Props {
  className: string | null;
}

const AgoraListPage: NextPage<Props> = ({ className }) => {
  return <div>class name: [{className}]</div>;
};

export default AgoraListPage;

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  return {
    props: {
      className: queryToString(context.params?.class_name),
    },
  };
};
