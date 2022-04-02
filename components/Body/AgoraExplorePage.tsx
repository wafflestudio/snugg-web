import React from "react";
import styles from "/styles/AgoraExplorePage.module.scss";
import LectureInfo from "../Reused/LectureInfo";

const AgoraExplorePage = () => {
  const lectureInfo = {
    courseName: "대학영어",
    professor: "홍길동",
    credits: 3,
    courseCode: "L0441.000600 / 007",
    studentNumber: 22,
    grade: 3,
    dept: "영어영문학과",
    key: 1,
  };
  const lectureInfos = [];
  for (let i = 0; i < 10; i++) {
    lectureInfos.push({ ...lectureInfo, key: i });
  }
  return (
    <div className={styles.page}>
      <div className={styles.text}>인기 강의</div>
      {lectureInfos.map((lectureInfo) => (
        <LectureInfo
          courseCode={lectureInfo.courseCode}
          courseName={lectureInfo.courseName}
          credits={lectureInfo.credits}
          dept={lectureInfo.dept}
          grade={lectureInfo.grade}
          professor={lectureInfo.professor}
          studentNumber={lectureInfo.studentNumber}
          key={lectureInfo.key}
        />
      ))}
    </div>
  );
};

export default AgoraExplorePage;
