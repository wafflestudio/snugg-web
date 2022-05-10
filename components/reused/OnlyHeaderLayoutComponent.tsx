import styles from "../../styles/OnlyHeaderLayout.module.scss";

import React from "react";
import Header1Component from "./Header1Component";
import Header2Component from "./Header2Component";

type props = {
  children: React.ReactNode;
};

const OnlyHeaderLayoutComponent = ({ children }: props) => {
  return (
    <div className={styles.pageWrapper}>
      <header className={styles.pageHeader}>
        <Header1Component />
        <Header2Component />
        {/*header 컴포넌트 위치*/}
      </header>
      <div className={styles.pageContent}>{children}</div>
    </div>
  );
};

export default OnlyHeaderLayoutComponent;
