import CheckIcon from '@mui/icons-material/Check';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

import styles from "../styles/QuestionAnswerBoxComponent.module.scss";
import LoremIpsum from "react-lorem-ipsum";

interface Props {}

const AnswerBoxComponent = (props: Props) => {
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
            <div className={styles.questionComment}>
                <ChatBubbleIcon className={styles.chatBubbleIcon} />
                <div>댓글쓰기</div>
            </div>
        </div>
    </div>
  );
};

export default AnswerBoxComponent;