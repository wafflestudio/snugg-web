import { NextPage } from "next";

import styles from "../styles/QuestionAnswerPage.module.scss";
import QuestionBoxComponent from "../components/QuestionBoxComponent";

interface Props {}

const QuestionAnswerPage: NextPage<Props> = () => {
  return (
      <div className={styles.container}>
          <div className={styles.mainContainer}>
              <QuestionBoxComponent />
          </div>
      </div>
  );
};

export default QuestionAnswerPage;