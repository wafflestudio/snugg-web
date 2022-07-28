import styles from "./styles.module.scss";
import QuestionPreview from "../../../reused/question/QuestionPreview";
import { FC } from "react";
import { Post } from "../../../../store/api/injected";

interface Props {
  query: string;
  posts: Post[];
}

const QuestionSearchPage: FC<Props> = ({ posts, query }) => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.title}>{posts.length}개의 검색결과</div>
      <div className={styles.details}>
        <div className={styles.condition}>
          <div className={styles.conditionTitle}>검색 조건:</div>
          {/* TODO: 태그 및 작성자 추가*/}
          <div>검색어 [{query}]</div>
        </div>
        {/*
          // TODO: 정렬 순서 추가
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
           */}
      </div>
      {posts.map((post) => (
        <QuestionPreview post={post} key={post.pk} />
      ))}
    </div>
  );
};

export default QuestionSearchPage;
