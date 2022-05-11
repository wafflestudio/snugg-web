import styles from "../../../styles/layout/OnlyHeaderLayout.module.scss";

import React from "react";
import UpperHeader from "../header/UpperHeader";
import LowerHeader from "../header/LowerHeader";

type props = {
  children: React.ReactNode;
};

const OnlyHeaderLayout = ({ children }: props) => {
  return (
    <div className={styles.pageWrapper}>
      <header className={styles.pageHeader}>
        <UpperHeader />
        <LowerHeader />
        {/*header 컴포넌트 위치*/}
      </header>
      <div className={styles.pageContent}>{children}</div>
    </div>
  );
};

export default OnlyHeaderLayout;
