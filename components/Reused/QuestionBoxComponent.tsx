import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { Button } from "@mui/material";

import styles from "../../styles/QuestionAnswerBoxComponent.module.scss";
import LoremIpsum from "react-lorem-ipsum";
import { QuestionResponse } from "../../api";
import Moment from "react-moment";

interface Props {
  questionData: QuestionResponse | null;
  onDeleteQuestion: () => {};
}

const QuestionBoxComponent = (Props: Props) => {
  return (
    <div className={styles.questionBox}>
      <div className={styles.questionTitle}>
        <QuestionMarkIcon className={styles.questionMarkIcon} />
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
        <div className={styles.questionComment}>
          <ChatBubbleIcon className={styles.chatBubbleIcon} />
          <div>댓글쓰기</div>
        </div>
      </div>
    </div>
  );
};

export default QuestionBoxComponent;
