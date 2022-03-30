import { GetServerSideProps, NextPage } from "next";

import styles from "../../styles/QuestionAnswerPage.module.scss";
import QuestionBoxComponent from "../../components/Reused/QuestionBoxComponent";
import AnswerBoxComponent from "../../components/Reused/AnswerBoxComponent";
import { queryToString } from "../../utility";

interface Props {
  questionId: number;
}

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

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  return {
    props: {
      questionId: Number(queryToString(context.params?.question_id))
    }
  };
};
