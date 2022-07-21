import CheckIcon from "@mui/icons-material/Check";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import styles from "../../../styles/quesiton/QuestionAnswerBox.module.scss";

import { Button, Divider, Input } from "@mui/material";
import CommentBox from "./CommentBox";
import { FC, useState } from "react";
import Moment from "react-moment";
import { selectUserInfo, useAppSelector } from "../../../store";
import { toast } from "react-toastify";
import { Answer } from "../../../store/api/injected";
import { enhancedApi } from "../../../store/api/enhanced";
import { errorToString } from "../../../utility";

interface Props {
  onDeleteAnswer: (id: number) => void;
  answerData: Answer;
  accepted: boolean;
  acceptable: boolean;
}

const AnswerBox: FC<Props> = ({
  answerData,
  onDeleteAnswer,
  accepted,
  acceptable,
}: Props) => {
  const [commentOpen, setCommentOpen] = useState<boolean>(false);
  const userInfo = useAppSelector(selectUserInfo);
  const [acceptAnswer] = enhancedApi.useQnaPostsAcceptAnswerMutation();

  const onAcceptAnswer = () => {
    acceptAnswer({
      id: answerData.post,
      accepted_answer: answerData.pk!!,
    }).then((result) => {
      if ("error" in result) {
        toast.error("채택할 수 없습니다: " + errorToString(result.error));
      } else {
        toast.success("채택되었습니다");
      }
    });
  };

  return (
    <div className={styles.questionBox}>
      <div className={styles.questionTitle}>
        {accepted ? (
          <>
            <CheckIcon className={styles.questionMarkIcon} />
            <div>채택 완료</div>
          </>
        ) : (
          acceptable && (
            <Button className={styles.button} onClick={() => onAcceptAnswer()}>
              채택하기
            </Button>
          )
        )}
      </div>
      <div className={styles.questionText}>{answerData.content}</div>
      <div className={styles.questionBottom}>
        <div className={styles.questionInfo}>
          <AccountCircleIcon className={styles.accountCircleIcon} />
          <div className={styles.questionUser}>
            {answerData.writer?.username} 님의 답변
          </div>
          <div className={styles.answerCount}>답변 20 채택 10</div>
          <div className={styles.questionTime}>
            <Moment format={"YYYY.MM.DD"}>{answerData.created_at}</Moment>
          </div>
        </div>
        <div className={styles.questionButtons}>
          <Button
            className={styles.questionButton}
            disabled={userInfo?.pk !== answerData.writer?.pk}
          >
            <EditIcon className={styles.questionButtonIcon} />
            <div>수정하기</div>
          </Button>
          <Button
            disabled={userInfo?.pk !== answerData.writer?.pk}
            onClick={() => {
              answerData.pk && onDeleteAnswer(answerData.pk);
            }}
            className={styles.questionButton}
          >
            <DeleteIcon className={styles.questionButtonIcon} />
            <div>삭제하기</div>
          </Button>
          <Button
            className={styles.questionButton}
            onClick={() => setCommentOpen(!commentOpen)}
          >
            <ChatBubbleIcon className={styles.questionButtonIcon} />
            <div>댓글쓰기</div>
          </Button>
        </div>
      </div>
      <div
        className={commentOpen ? styles.commentSection : styles.commentClosed}
      >
        <Divider className={styles.commentDivider} />
        <div className={styles.commentTitle}>N개의 댓글</div>
        <div className={styles.writeComment}>
          <AccountCircleIcon className={styles.accountCircleIcon} />
          <Input disableUnderline={true} placeholder="댓글을 남겨주세요." />
          <Button>등록</Button>
        </div>
        <CommentBox />
        <CommentBox />
      </div>
    </div>
  );
};

export default AnswerBox;
