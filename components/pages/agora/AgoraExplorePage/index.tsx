import React from "react";
import styles from "./styles.module.scss";
import LectureInfo from "../../../reused/agora/LectureInfo";
import { dummyLectures } from "../../../../utility";
import { AgoraLectureInfo } from "../../../../api";

interface Props {
  query: string | null;
  lectureInfos: AgoraLectureInfo[];
}

const AgoraExplorePage = ({ query, lectureInfos }: Props) => {
  return (
    <div className={styles.page}>
      <div className={styles.text}>{query ? "검색 결과" : "인기 강의"}</div>
      {lectureInfos.map((lectureInfo) => (
        <LectureInfo
          courseCode={lectureInfo.lecture_id}
          courseName={lectureInfo.name}
          credits={3}
          dept={lectureInfo.major}
          grade={3}
          professor={lectureInfo.instructor}
          studentNumber={20}
          key={lectureInfo.pk}
        />
      ))}
    </div>
  );
};

export default AgoraExplorePage;
