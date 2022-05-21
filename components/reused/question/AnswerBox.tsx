import CheckIcon from "@mui/icons-material/Check";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import styles from "../../../styles/quesiton/QuestionAnswerBox.module.scss";
import LoremIpsum from "react-lorem-ipsum";

import { Button, Divider, Input } from "@mui/material";
import CommentBox from "./CommentBox";
import { FC, useState } from "react";
import { AnswerPostInfo } from "../../../api";

interface Props {
  onDeleteAnswer: (id: number) => void;
  AnswerData: AnswerPostInfo;
}

const AnswerBox: FC<Props> = ({
  AnswerData: { pk },
  onDeleteAnswer,
}: Props) => {
  const [commentOpen, setCommentOpen] = useState<boolean>(false);

  return (
    <div className={styles.questionBox}>
      <div className={styles.questionTitle}>
        <CheckIcon className={styles.questionMarkIcon} />
        <div>채택 완료</div>
      </div>
      <div className={styles.questionText}>
        <LoremIpsum p={2} />
      </div>
      <div className={styles.questionBottom}>
        <div className={styles.questionInfo}>
          <AccountCircleIcon className={styles.accountCircleIcon} />
          <div className={styles.questionUser}>user 님의 답변</div>
          <div className={styles.answerCount}>답변 20 채택 10</div>
          <div className={styles.questionTime}>2022.02.28</div>
        </div>
        <div className={styles.questionButtons}>
          <div className={styles.questionButton}>
            <EditIcon className={styles.questionButtonIcon} />
            <div>수정하기</div>
          </div>
          <div
            onClick={() => {
              onDeleteAnswer(pk);
            }}
            className={styles.questionButton}
          >
            <DeleteIcon className={styles.questionButtonIcon} />
            <div>삭제하기</div>
          </div>
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
