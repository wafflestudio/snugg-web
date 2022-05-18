import { FC, useState } from "react";
import styles from "./styles.module.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { Divider, OutlinedInput } from "@mui/material";
import ClassPostComment from "../../../reused/agora/ClassPostComment";

interface Props {
  className: string | null;
  postId: number;
  onSubmitComment: (comment: string) => void;
}

export const AgoraPostPage: FC<Props> = ({ onSubmitComment }) => {
  const [comment, setComment] = useState("");
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
          <p>
            Lorem ipsum odor amet, consectetuer adipiscing elit. Dictum adipiscing mauris ligula vitae efficitur? Mi
            egestas pharetra efficitur diam gravida gravida placerat, dui adipiscing. Pharetra elementum ornare fusce hac
            nibh felis. Sociosqu mauris ultrices ultrices nulla vestibulum etiam magna. Dignissim hac velit integer turpis
            mauris. Senectus hendrerit senectus maximus, in fermentum nostra bibendum feugiat.
          </p>
        </div>
      </div>
      <Divider className={styles.divider} />
      <form className={styles.writeComment} onSubmit={(e) => {
        e.preventDefault();
        onSubmitComment(comment);
      }}>
        <AccountCircleIcon className={styles.accountCircleIcon} />
        <OutlinedInput
          className={styles.input}
          placeholder="댓글을 남겨주세요."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <input type="submit" value="등록" className={styles.submit} />
      </form>
      {[0, 1, 2, 3, 4].map((item) => {
        return <ClassPostComment key={item} />;
      })}
    </div>
  );
};
