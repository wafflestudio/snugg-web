import React from "react";
import styles from "../QuestionIndexPage/styles.module.scss";
import PreviewComponent from "../../../reused/PreviewComponent";
const QuestionIndexPage = () => {
  return (
    <div className={styles.mainPage}>
      <div className={styles.mainHeader}>최근 질문</div>
      {/*배열로 렌더링해야되는 부분*/}
      <PreviewComponent /> {/*제목, 내용등이 인자로 들어가야됨.*/}
      <PreviewComponent />
      <PreviewComponent />
    </div>
  );
};

export default QuestionIndexPage;
