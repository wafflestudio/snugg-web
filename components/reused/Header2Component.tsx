import React from "react";
import styles from "../../styles/Header2.module.scss";

const Header2Component = () => {
  return (
    <div className={styles.header2}>
      <div className={styles.buttonGroup}>
        <button className={`${styles.unSelected} ${styles.button}`}>홈</button>
        <button className={`${styles.unSelected} ${styles.button}`}>
          전공분야
        </button>
        <button className={`${styles.unSelected} ${styles.button}`}>
          태그
        </button>
        <button className={`${styles.unSelected} ${styles.button}`}>
          아고라
        </button>
      </div>
      <div className={`${styles.question} ${styles.button}`}>질문하기</div>
    </div>
  );
};

export default Header2Component;
