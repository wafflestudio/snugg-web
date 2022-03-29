import { GetServerSideProps, NextPage } from "next";
import { queryToString } from "../../../utility";

import styles from "../../../styles/AgoraListPage.module.scss";
import ClassPostPreview from "../../../components/Reused/ClassPostPreview";
import { Pagination } from "@mui/material";

interface Props {
  className: string | null;
}

const AgoraListPage: NextPage<Props> = ({ className }) => {
  return (
    <div className={styles.container}>
      <div className={styles.className}>강의 제목</div>
      {[...Array(10)].map((item) => {
        return <ClassPostPreview key={item} />;
      })}
      <Pagination count={10} siblingCount={10} size="small" />
    </div>
  );
};

export default AgoraListPage;

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  return {
    props: {
      className: queryToString(context.params?.class_name)
    }
  };
};
