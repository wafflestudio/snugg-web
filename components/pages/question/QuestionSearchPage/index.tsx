import styles from "./styles.module.scss";
import QuestionPreview from "../../../reused/question/QuestionPreview";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { FC } from "react";
import { QuestionPost } from "../../../../api";

interface Props {
  query: string;
  posts: QuestionPost[];
}

const QuestionSearchPage: FC<Props> = (props) => {
  //const content = props.content; //여기에서 버그남, JSX Element 안에 object 들어가면 안됨.

  return (
    <div className={styles.mainContainer}>
      <div className={styles.title}>N개의 검색결과</div>
      <div className={styles.details}>
        {/* 구체화 예정 */}
        <div className={styles.condition}>
          <div className={styles.conditionTitle}>검색 조건:</div>
          <div>검색어 [{props.query}] 태그 [000] 작성자 [000]</div>
        </div>
        <ToggleButtonGroup>
          <ToggleButton
            value="관련도순"
            className={`${styles.button} ${styles.click}`}
          >
            관련도순
          </ToggleButton>
          <ToggleButton
            value="최신순"
            className={`${styles.button} ${styles.unclick}`}
          >
            최신순
          </ToggleButton>
        </ToggleButtonGroup>
        {/* <div className={styles.buttons}>
                <button className={`${styles.button} ${styles.click}`}>관련도순</button>
                <button className={`${styles.button} ${styles.unclick}`}>최신순</button>
            </div> */}
      </div>
      {props.posts.map((post) =>
        <QuestionPreview post={post} key={post.pk} />
      )}
    </div>
  );
};

export default QuestionSearchPage;
