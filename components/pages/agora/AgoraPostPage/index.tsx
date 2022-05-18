import { FC } from "react";
import styles from "./styles.module.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import LoremIpsum from "react-lorem-ipsum";
import { Divider, OutlinedInput } from "@mui/material";
import ClassPostComment from "../../../reused/agora/ClassPostComment";

interface Props {
  className: string | null;
  postId: number;
}

export const AgoraPostPage: FC<Props> = () => {
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
            <div>5</div>
          </div>
        </div>
        <div className={styles.postContent}>
          <LoremIpsum p={2} />
        </div>
      </div>
      <Divider className={styles.divider} />
      <div className={styles.writeComment}>
        <AccountCircleIcon className={styles.accountCircleIcon} />
        <OutlinedInput
          className={styles.input}
          placeholder="댓글을 남겨주세요."
        />
        <button>등록</button>
      </div>
      {[0,1,2,3,4].map((item) => {
        return <ClassPostComment key={item} />;
      })}
    </div>
  );
};
