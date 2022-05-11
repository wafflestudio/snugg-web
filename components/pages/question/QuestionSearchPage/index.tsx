import styles from "./styles.module.scss";
import PreviewComponent from "../../../reused/PreviewComponent";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

interface Props {
  content: string | null;
}

const QuestionSearchPage = (props: Props) => {
  const content = props;

  return (
    <div className={styles.mainContainer}>
      <div className={styles.title}>N개의 검색결과</div>
      <div className={styles.details}>
        {/* 구체화 예정 */}
        <div className={styles.condition}>
          <div className={styles.conditionTitle}>검색 조건:</div>
          <div>검색어 [{content}] 태그 [000] 작성자 [000]</div>
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
      <PreviewComponent />
      <PreviewComponent />
      <PreviewComponent />
    </div>
  );
};

export default QuestionSearchPage;
