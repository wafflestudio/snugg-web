import React from "react";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import { Link } from "@mui/material";
import NextLink from "next/link";

const LowerHeader = () => {
  return (
    <div className={styles.header2}>
      <div className={styles.buttonGroup}>
        <NextLink href={"/question"} passHref>
          <Link className={`${styles.unSelected} ${styles.button}`}>홈</Link>
        </NextLink>
        <NextLink href={"/"} passHref>
          <Link className={`${styles.unSelected} ${styles.button}`}>
            전공분야
          </Link>
        </NextLink>
        <NextLink href={"question/tags"} passHref>
          <Link className={`${styles.unSelected} ${styles.button}`}>태그</Link>
        </NextLink>
        <NextLink href={"agora"} passHref>
          <Link className={`${styles.unSelected} ${styles.button}`}>
            아고라
          </Link>
        </NextLink>
      </div>
      <NextLink href={"question/ask"} passHref>
        <Link className={`${styles.unSelected} ${styles.button}`}>
          질문하기
        </Link>
      </NextLink>
    </div>
  );
};

export default LowerHeader;
