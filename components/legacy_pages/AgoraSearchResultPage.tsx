import React from "react";
import styles from "/styles/AgoraExplorePage.module.scss";
import LectureInfo from "../reused/LectureInfo";

const AgoraSearchResultPage = () => {
  //검색 로직
  return (
    <div className={styles.page}>
      <div className={styles.text}>검색 결과</div>
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

export default AgoraSearchResultPage;
