import styles from "../../styles/Layout.module.scss";

import React from "react";
import Header1Component from "../Header/Header1Component";
import Header2Component from "../Header/Header2Component";
import SideComponent from "../Reused/SideComponent";

interface props {}

const DefaultLayoutComponent: React.FC<props> = ({ children }) => {
  return (
    <div className={styles.pageWrapper}>
      <header className={styles.pageHeader}>
        <Header1Component />
        <Header2Component />
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
