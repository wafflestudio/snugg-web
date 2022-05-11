import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Button } from "@mui/material";

import styles from "../../../styles/quesiton/QuestionAnswerBox.module.scss";
import LoremIpsum from "react-lorem-ipsum";
import { QuestionResponse } from "../../../api";
import Moment from "react-moment";

interface Props {
  questionData: QuestionResponse | null;
  onDeleteQuestion: () => {};
}

const QuestionBox = (Props: Props) => {
  return (
    <div className={styles.questionBox}>
      <div className={styles.questionTitle}>
        <QuestionMarkIcon className={styles.questionMarkIcon} />
        <div>제목을 입력하세요</div>
      </div>
      <div className={styles.previewHeader1}>
        <span className={styles.previewHeader1Text}>전공분야</span>
        <div className={`${styles.previewHeaderTag} ${styles.bg1}`}>#태그1</div>
        <div className={`${styles.previewHeaderTag} ${styles.bg2}`}>#태그2</div>
        <div className={`${styles.previewHeaderTag} ${styles.bg3}`}>#태그3</div>
        <MoreHorizIcon className={styles.moreTags} />
      </div>
      <div className={styles.questionText}>
        <LoremIpsum p={2} />
        <div>{Props.questionData?.title}</div>
        <Button onClick={Props.onDeleteQuestion} variant="outlined">
          삭제
        </Button>
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
          <div className={styles.questionButton}>
            <DeleteIcon className={styles.questionButtonIcon} />
            <div>삭제하기</div>
          </div>
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
