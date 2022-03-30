import styles from "../../styles/LectureExploreLayout.module.scss";

import React from "react";
import Header1Component from "../Header/Header1Component";
import Header2Component from "../Header/Header2Component";
import SideComponent from "../Reused/SideComponent";
import { Divider } from "@mui/material";
import MyLecture from "../Reused/MyLecture";

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
          <span className={`${styles.myLecture} ${styles.padding}`}>
            내 강의
          </span>
          <span className={styles.dividerWrapper}>
            <Divider className={styles.divider} />
          </span>
          <div className={styles.padding}>
            <MyLecture name={"알고리즘"} alarmed={true} />
            <MyLecture name={"알고리즘"} alarmed={true} />
            <MyLecture name={"알고리즘"} alarmed={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayoutComponent;
