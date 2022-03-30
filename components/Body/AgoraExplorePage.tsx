import React from "react";
import styles from "/styles/AgoraExplorePage.module.scss";
import LectureInfo from "../Reused/LectureInfo";

const AgoraExplorePage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.text}>인기 강의</div>
      <LectureInfo />
      <LectureInfo />
      <LectureInfo />
      <LectureInfo />
      <LectureInfo />
      <LectureInfo />
      <LectureInfo />
      <LectureInfo />
    </div>
  );
};

export default AgoraExplorePage;
