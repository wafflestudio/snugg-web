import React, { FC } from "react";
import styles from "../../../styles/quesiton/CommentBox.module.scss";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button } from "@mui/material";
import { CommentInfo } from "../../../api";
import Moment from "react-moment";
import { Comment } from "store/api/injected";

interface Props {
  commentData: Comment;
}

const CommentBox: FC<Props> = ({ commentData }) => {
  return (
    <div className={styles.commentContainer}>
      <div className={styles.upperLine}>
        <AccountCircleIcon className={styles.accountCircleIcon} />
        <div>{commentData.content}</div>
      </div>
      <div className={styles.lowerLine}>
        <Button>수정하기</Button>
        <Button>삭제하기</Button>
        <Moment format={"YYYY.MM.DD HH:mm"} className={styles.moment}>
          {commentData.created_at}
        </Moment>
        <div>{commentData.writer?.username}</div>
      </div>
    </div>
  );
};

export default CommentBox;
