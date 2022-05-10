import React from "react";
import styles from "../../styles/SideComponent.module.scss";

interface props {
  text: string;
  //Content: something
}

const SideComponent = (props: props) => {
  return (
    <div className={styles.sideComponent}>
      <div className={styles.sideComponentHeader}>{props.text}</div>
      <div className={styles.sideComponentContent}>
        {/*질문 내용이 들어감.*/}
      </div>
    </div>
  );
};

export default SideComponent;
