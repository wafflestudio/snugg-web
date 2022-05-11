import React from "react";
import styles from "../QuestionIndexPage/styles.module.scss";
import QuestionPreview from "../../../reused/question/QuestionPreview";
const QuestionIndexPage = () => {
  return (
    <div className={styles.mainPage}>
      <div className={styles.mainHeader}>최근 질문</div>
      {/*배열로 렌더링해야되는 부분*/}
      <QuestionPreview /> {/*제목, 내용등이 인자로 들어가야됨.*/}
      <QuestionPreview />
      <QuestionPreview />
    </div>
  );
};

export default QuestionIndexPage;
