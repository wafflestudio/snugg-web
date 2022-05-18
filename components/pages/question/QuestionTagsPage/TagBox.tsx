import React from "react";
import styles from "../../../../styles/quesiton/TagBox.module.scss";
import NextLink from "next/link";
interface props {}

const TagBox = (props: props) => {
  return (
    <li className={styles.tagBox}>
      <NextLink href={"/question/tags"} passHref>
        <a className={styles.tagName}>TagName</a>
      </NextLink>
      <br />
      <span className={styles.tagContents}>contents 주절주절...</span>
      <span className={styles.tagCount}>질문개수: XX개</span>
    </li>
  );
};

export default TagBox;
