import { NextPage } from "next";

import styles from "../styles/QuestionAnswerPage.module.scss";
import QuestionBoxComponent from "../components/QuestionBoxComponent";
import AnswerBoxComponent from "../components/AnswerBoxComponent";

interface Props {}

const QuestionAnswerPage: NextPage<Props> = () => {
  return (
      <div className={styles.container}>
          <div className={styles.mainContainer}>
              <QuestionBoxComponent />
              <AnswerBoxComponent />
          </div>
      </div>
  );
};

export default QuestionAnswerPage;