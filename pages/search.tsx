import { NextPage } from "next";

import styles from "../styles/SearchPage.module.scss";
import PreviewComponent from "../components/Reused/PreviewComponent";

interface Props {}

const SearchPage: NextPage<Props> = () => {
  return (
      <div className={styles.mainContainer}>
          <div className={styles.title}>N개의 검색결과</div>
          <div className={styles.details}>
            {/* 구체화 예정 */}
            <div className={styles.condition}>
                <div className={styles.conditionTitle}>검색 조건:</div>
                <div>검색어 [000] 태그 [000] 작성자 [000]</div>
            </div>
            <div className={styles.buttons}>
                <button className={`${styles.button} ${styles.click}`}>관련도순</button>
                <button className={`${styles.button} ${styles.unclick}`}>최신순</button>
            </div>
          </div>
          <PreviewComponent />
          <PreviewComponent />
          <PreviewComponent />
      </div>
  );
};

export default SearchPage;