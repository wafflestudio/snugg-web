import CheckIcon from "@mui/icons-material/Check";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import styles from "../../../styles/quesiton/QuestionAnswerBox.module.scss";

import { Button, Divider, Input } from "@mui/material";
import CommentBox from "./CommentBox";
import { FC, useEffect, useState } from "react";
import api, {
  AnswerPostInfo,
  CommentInfo,
  ListCommentInfo,
} from "../../../api";
import Moment from "react-moment";
import { useAppSelector } from "../../../store";
import axios from "axios";

interface Props {
  onDeleteAnswer: (id: number) => void;
  answerData: AnswerPostInfo;
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
  const me = useAppSelector((state) => state.users.data);

  const onAcceptAnswer = () => {
    const token = me?.token?.access;
    if (token === undefined) {
      alert("먼저 로그인을 하십시오");
      return;
    }
    (async () => {
      try {
        await api.acceptAnswer(answerData.post, answerData.pk, token);
        alert("채택되었습니다");
      } catch (e) {
        if (axios.isAxiosError(e)) {
          alert("채택할 수 없습니다: " + e.response);
        } else {
          throw e;
        }
      }
    })();
  };

  const [answerComments, setAnswerComments] = useState<CommentInfo[]>();
  useEffect(() => {
    async function getAnswerComments() {
      const data = await api.listComment("answer", answerData.pk);
      if (data) {
        setAnswerComments(data.data.results);
      }
    }
    getAnswerComments();
  }, []);

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
            {answerData.writer.username} 님의 답변
          </div>
          <div className={styles.answerCount}>답변 20 채택 10</div>
          <div className={styles.questionTime}>
            <Moment format={"YYYY.MM.DD"}>{answerData.created_at}</Moment>
          </div>
        </div>
        <div className={styles.questionButtons}>
          <Button
            className={styles.questionButton}
            disabled={me?.user.pk !== answerData.writer.pk}
          >
            <EditIcon className={styles.questionButtonIcon} />
            <div>수정하기</div>
          </Button>
          <Button
            disabled={me?.user.pk !== answerData.writer.pk}
            onClick={() => {
              onDeleteAnswer(answerData.pk);
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
        {answerComments && answerComments.length >= 1
          ? answerComments.map((item) => (
              <CommentBox key={item.pk} commentData={item} />
            ))
          : null}
      </div>
    </div>
  );
};

export default AnswerBox;
