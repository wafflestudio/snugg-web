import { NextPage } from "next";

import styles from "../styles/QuestionAnswerPage.module.scss";
import QuestionBoxComponent from "../components/QuestionBoxComponent";
import AnswerBoxComponent from "../components/AnswerBoxComponent";

interface Props {}

const QuestionAnswerPage: NextPage<Props> = () => {
  return (
        <div className={styles.mainContainer}>
            <QuestionBoxComponent />
            <div className={styles.answerCount}>N개의 답변</div>
            <AnswerBoxComponent />
            <div className={styles.answerWriter}>
                <div>답변 작성하기</div>
                <input />
                <button>답변 등록하기</button>
            </div>
        </div>
  );
};

export default QuestionAnswerPage;