import React from "react";
import styles from "../../../styles/header/LowerHeader.module.scss";
import NextLink from "next/link";
const LowerHeader = () => {
  return (
    <div className={styles.header2}>
      <div className={styles.buttonGroup}>
        <NextLink href={"/question"}>
          <a className={`${styles.unSelected} ${styles.button}`}>홈</a>
        </NextLink>
        <NextLink href={"/question"}>
          <a className={`${styles.unSelected} ${styles.button}`}>전공분야</a>
        </NextLink>
        <NextLink href={"/question/tags"}>
          <a className={`${styles.unSelected} ${styles.button}`}>태그</a>
        </NextLink>
        <NextLink href={"/agora"}>
          <a className={`${styles.unSelected} ${styles.button}`}>아고라</a>
        </NextLink>
      </div>
      <NextLink href={"/question/ask"}>
        <a className={styles.question}>질문하기</a>
      </NextLink>
    </div>
  );
};

export default LowerHeader;
