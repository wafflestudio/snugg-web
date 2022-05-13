import React from "react";
import styles from "../../../styles/header/LowerHeader.module.scss";
import { useRouter } from "next/router";
import NextLink from "next/link";
const LowerHeader = () => {
  const router = useRouter();
  return (
    <div className={styles.header2}>
      <div className={styles.buttonGroup}>
        {/* eslint-disable-next-line react/jsx-no-undef */}
        <NextLink href={"/question"}>
          <div className={`${styles.unSelected} ${styles.button}`}>홈</div>
        </NextLink>
        <NextLink href={"/question"}>
          <div className={`${styles.unSelected} ${styles.button}`}>
            전공분야
          </div>
        </NextLink>
        <NextLink href={"/question/tags"}>
          <div className={`${styles.unSelected} ${styles.button}`}>태그</div>
        </NextLink>
        <NextLink href={"/agora"}>
          <div className={`${styles.unSelected} ${styles.button}`}>아고라</div>
        </NextLink>
      </div>
      <NextLink href={"/question/ask"}>
        <div className={`${styles.unSelected} ${styles.button}`}>질문하기</div>
      </NextLink>
    </div>
  );
};

export default LowerHeader;
