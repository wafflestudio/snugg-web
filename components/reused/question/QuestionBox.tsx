import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Button } from "@mui/material";
import NextLink from "next/link";

import styles from "../../../styles/quesiton/QuestionAnswerBox.module.scss";
import { QuestionPost } from "../../../api";
import Moment from "react-moment";

interface Props {
  questionData: QuestionPost | null;
  onDeleteQuestion: () => {};
}

const QuestionBox = (Props: Props) => {
  const styleBgs = [styles.bg1, styles.bg2, styles.bg3];

  return (
    <div className={styles.questionBox}>
      <div className={styles.questionTitle}>
        <QuestionMarkIcon className={styles.questionMarkIcon} />
        <div>{Props.questionData?.title}</div>
      </div>
      <div className={styles.previewHeader1}>
        <span className={styles.previewHeader1Text}>
          {Props.questionData?.field}
        </span>
        {Props.questionData?.tags.map((tag, i) => (
          <NextLink href={"/question/tags"} passHref key={tag}>
            <div
              key={tag}
              className={`${styles.previewHeaderTag} ${styleBgs[i % 3]}`}
            >
              #{tag}
            </div>
          </NextLink>
        ))}
        <MoreHorizIcon className={styles.moreTags} />
      </div>
      <div className={styles.questionText}>{Props.questionData?.content}</div>
      <div className={styles.questionBottom}>
        <div className={styles.questionInfo}>
          <AccountCircleIcon className={styles.accountCircleIcon} />
          <div className={styles.questionUser}>
            {Props.questionData?.writer.username} 님의 질문
          </div>
          <div className={styles.questionTime}>
            <Moment format={"YYYY.MM.DD"}>
              {Props.questionData?.writer.created_at}
            </Moment>
          </div>
        </div>
        <div className={styles.questionButtons}>
          <div className={styles.questionButton}>
            <EditIcon className={styles.questionButtonIcon} />
            <div>수정하기</div>
          </div>
          <Button
            onClick={Props.onDeleteQuestion}
            className={styles.questionButton}
          >
            <DeleteIcon className={styles.questionButtonIcon} />
            <div>삭제하기</div>
          </Button>
          <div className={styles.questionButton}>
            <ChatBubbleIcon className={styles.questionButtonIcon} />
            <div>댓글쓰기</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionBox;
