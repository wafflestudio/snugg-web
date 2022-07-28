import React, { FunctionComponent } from "react";
import styles from "./styles.module.scss";
import LectureInfo from "../../../reused/agora/LectureInfo";
import { useAgoraLecturesListQuery } from "../../../../store/api/injected";

interface Props {
  query: string | null;
}

const AgoraExplorePage: FunctionComponent<Props> = ({ query }) => {
  const { data, error } = useAgoraLecturesListQuery({
    search: query ?? undefined,
  });
  return (
    <div className={styles.page}>
      <div className={styles.text}>{query ? "검색 결과" : "인기 강의"}</div>
      {error
        ? "error"
        : data
        ? data.results!!.map((lectureInfo) => (
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
          ))
        : "loading"}
    </div>
  );
};

export default AgoraExplorePage;
