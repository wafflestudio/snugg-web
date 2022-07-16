import React, { FunctionComponent } from "react";
import styles from "./styles.module.scss";
import QuestionPreview from "../../../reused/question/QuestionPreview";
import { QuestionPostInfo } from "../../../../api";

interface Props {
  posts: QuestionPostInfo[];
}
const QuestionIndexPage: FunctionComponent<Props> = ({ posts }) => {
  return (
    <div className={styles.mainPage}>
      <div className={styles.mainHeader}>최근 질문</div>
      {posts.map((post) => (
        <QuestionPreview post={post} key={post.pk} />
      ))}
    </div>
  );
};

export default QuestionIndexPage;
