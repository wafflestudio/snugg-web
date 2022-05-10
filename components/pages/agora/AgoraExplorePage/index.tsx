import React from "react";
import styles from "./styles.module.scss";
import LectureInfo from "../../../reused/LectureInfo";
import { dummyLectures } from "../../../../utility";

interface Props {
  query: string | null;
}

const AgoraExplorePage = ({query}: Props) => {
  const lectureInfos = dummyLectures();
  return (
    <div className={styles.page}>
      <div className={styles.text}>{query ? "검색 결과" : "인기 강의"}</div>
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
