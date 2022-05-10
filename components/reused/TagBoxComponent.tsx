import React from "react";
import styles from "../../styles/TagBox.module.scss";
interface props {}

const TagBoxComponent = (props: props) => {
  return (
    <li className={styles.tagBox}>
      <span className={styles.tagName}>TagName</span>
      <br />
      <span className={styles.tagContents}>contents 주절주절...</span>
      <span className={styles.tagCount}>질문개수: XX개</span>
    </li>
  );
};

export default TagBoxComponent;
