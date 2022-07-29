import React, { FC } from "react";
import styles from "../../../styles/quesiton/CommentBox.module.scss";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button } from "@mui/material";
import Moment from "react-moment";
import { Comment, useQnaCommentsDestroyMutation } from "store/api/injected";
import { toast } from "react-toastify";
import { errorToString } from "../../../utility";
import { useRouter } from "next/router";
import { selectUserInfo, useAppSelector } from "store";

interface Props {
  commentData: Comment;
}

const CommentBox: FC<Props> = ({ commentData }) => {
  const me = useAppSelector(selectUserInfo);

  const [destroyComment] = useQnaCommentsDestroyMutation();
  const onDeleteComment = () => {
    destroyComment({ id: commentData.pk! }).then((result) => {
      if ("error" in result) {
        toast.error(
          "질문을 삭제할 수 없습니다: " + errorToString(result.error)
        );
      } else {
        toast.success("질문을 삭제했습니다");
      }
    });
  };

  return (
    <div className={styles.commentContainer}>
      <div className={styles.upperLine}>
        <AccountCircleIcon className={styles.accountCircleIcon} />
        <div>{commentData.content}</div>
      </div>
      <div className={styles.lowerLine}>
        {me?.pk == commentData.writer?.pk && (
          <div>
            <Button>수정하기</Button>
            <Button onClick={onDeleteComment}>삭제하기</Button>
          </div>
        )}
        <Moment format={"YYYY.MM.DD HH:mm"} className={styles.moment}>
          {commentData.created_at}
        </Moment>
        <div>{commentData.writer?.username}</div>
      </div>
    </div>
  );
};

export default CommentBox;
