import React from "react";
import styles from "../../../styles/header/LowerHeader.module.scss";
import { useRouter } from "next/router";

const LowerHeader = () => {
  const router = useRouter();
  return (
    <div className={styles.header2}>
      <div className={styles.buttonGroup}>
        <button
          onClick={() => {
            router.push("/question");
          }}
          className={`${styles.unSelected} ${styles.button}`}
        >
          홈
        </button>
        <button
          onClick={() => {
            //전공분야 메뉴 컴포넌트가 없음..
          }}
          className={`${styles.unSelected} ${styles.button}`}
        >
          전공분야
        </button>
        <button
          onClick={() => {
            router.push("/question/tags");
          }}
          className={`${styles.unSelected} ${styles.button}`}
        >
          태그
        </button>
        <button
          onClick={() => {
            router.push("/agora");
          }}
          className={`${styles.unSelected} ${styles.button}`}
        >
          아고라
        </button>
      </div>
      <div
        onClick={() => {
          router.push("/question/ask");
        }}
        className={`${styles.question} ${styles.button}`}
      >
        질문하기
      </div>
    </div>
  );
};

export default LowerHeader;
