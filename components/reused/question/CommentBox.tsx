import React, { FC, useState } from "react";
import styles from "../../../styles/quesiton/CommentBox.module.scss";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button, OutlinedInput } from "@mui/material";
import Moment from "react-moment";
import {
  Comment,
  useQnaCommentsDestroyMutation,
  useQnaCommentsUpdateMutation,
} from "store/api/injected";
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
          "댓글을 삭제할 수 없습니다: " + errorToString(result.error)
        );
      } else {
        toast.success("댓글을 삭제했습니다");
      }
    });
  };

  const [commentContent, setCommentContent] = useState(commentData.content);
  const [editMode, setEditMode] = useState(false);
  const [editComment] = useQnaCommentsUpdateMutation();
  const handleEditComment = () => {
    if (!editMode) {
      setEditMode(true);
    } else {
      editComment({
        id: commentData.pk!,
        commentRequest: {
          content: commentContent,
        },
      }).then((result) => {
        if ("error" in result) {
          toast.error(
            "댓글을 수정할 수 없습니다." + errorToString(result.error)
          );
        } else {
          toast.success("댓글을 수정했습니다.");
          setEditMode(false);
        }
      });
    }
  };

  return (
    <div className={styles.commentContainer}>
      <div className={styles.upperLine}>
        <AccountCircleIcon className={styles.accountCircleIcon} />
        {!editMode && <div>{commentContent}</div>}
        {editMode && (
          <OutlinedInput
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            className={styles.editModeComment}
          />
        )}
      </div>
      <div className={styles.lowerLine}>
        {me?.pk == commentData.writer?.pk && (
          <div>
            <Button onClick={handleEditComment}>수정하기</Button>
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
