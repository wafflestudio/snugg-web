import { GetServerSideProps, NextPage } from "next";
import { queryToString } from "../../../utility";

import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

import styles from "../../../styles/AgoraPostPage.module.scss";
import LoremIpsum from "react-lorem-ipsum";

interface Props {
  className: string | null;
  postId: number;
}

const AgoraPostPage: NextPage<Props> = ({ className, postId }) => {
  return (
    <div className={styles.container}>
      <div className={styles.mainText}>
        <div className={styles.postTitle}>제목을 입력하세요.</div>
        <div className={styles.mainTextHeader}>
          <div className={styles.mainTextInfo}>
            <AccountCircleIcon className={styles.accountCircleIcon} />
            <div className={styles.postUser}>username</div>
            <div className={styles.postTime}>2022.02.28</div>
          </div>
          <div className={styles.postComment}>
            <ChatBubbleIcon className={styles.chatBubbleIcon} />
            <div>3</div>
          </div>
        </div>
        <div className={styles.postContent}>
          <LoremIpsum p={2} />
        </div>
      </div>
    </div>
  );
};

export default AgoraPostPage;

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  return {
    props: {
      className: queryToString(context.params?.class_name),
      postId: Number(queryToString(context.params?.post_id))
    }
  };
};
