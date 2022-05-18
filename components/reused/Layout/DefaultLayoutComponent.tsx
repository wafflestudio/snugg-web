import styles from "../../../styles/layout/Layout.module.scss";

import React from "react";
import UpperHeader from "../header/UpperHeader";
import LowerHeader from "../header/LowerHeader";
import SideComponent from "../SideComponent";

interface props {}

const DefaultLayoutComponent: React.FC<props> = ({ children }) => {
  return (
    <div className={styles.pageWrapper}>
      <header className={styles.pageHeader}>
        <UpperHeader />
        <LowerHeader />
        {/*header 컴포넌트 위치*/}
      </header>
      <div className={styles.pageContent}>
        <div className={styles.pageMain}>{children}</div>
        <div className={styles.pageSideBar}>
          <SideComponent text={"최근 본 질문"} />
          <SideComponent text={"인기 질문"} />
          {/*사이드바 컴포넌트 위치*/}
        </div>
      </div>
    </div>
  );
};

export default DefaultLayoutComponent;
