import React, { FC } from "react";
import styles from "../../../styles/quesiton/SimplifiedPreview.module.scss";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { AnswerPostInfo, QuestionPost } from "api";
import { json } from "stream/consumers";
import answerPosts from "store/answerPosts";

interface Props {
  post?: QuestionPost;
  answer?: AnswerPostInfo;
}

const SimplifiedPreview: FC<Props> = ({ post, answer }) => {
  // console.log(item);
  return (
    <div className={styles.questionPreview}>
      <BookmarkIcon className={styles.previewContent1} />
      {post && <div className={styles.previewContent2}>{post.title}</div>}
      {answer && <div className={styles.previewContent2}>{answer.content}</div>}
      {post && <div className={styles.previewContent3}>{post.field}</div>}
      {post && post.tags.length !== 0 && (
        <div className={styles.previewContent4}>{post.tags[1]}</div>
      )}
    </div>
  );
};

export default SimplifiedPreview;
