import { NextPage } from "next";
import Image from "next/image";

import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

import styles from "../styles/QuestionAnswerPage.module.scss";
import LoremIpsum from "react-lorem-ipsum";

interface Props {}

const QuestionAnswerPage: NextPage<Props> = () => {
  return (
      <div className={styles.container}>
          <div className={styles.mainContainer}>
              <div className={styles.questionBox}>
                  <div className={styles.questionTitle}>
                      <QuestionMarkIcon className={styles.questionMarkIcon} />
                      <div>제목을 입력하세요</div>
                  </div>
                  <div className={styles.questionText}>
                      <LoremIpsum p={2} />
                  </div>
                  <div className={styles.questionBottom}>
                      <div className={styles.questionInfo}>
                          <AccountCircleIcon className={styles.accountCircleIcon} />
                          <div className={styles.questionUser}>user 님의 질문</div>
                          <div className={styles.questionTime}>2022.02.28</div>
                      </div>
                      <div className={styles.questionComment}>
                          <ChatBubbleIcon className={styles.chatBubbleIcon} />
                          <div>댓글쓰기</div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
};

export default QuestionAnswerPage;