import React from "react";
import styles from "/styles/agora/LectureInfo.module.scss";
import { Person } from "@mui/icons-material";

interface Props {
  courseName?: string;
  professor?: string;
  credits?: number;
  courseCode?: string;
  studentNumber?: number;
  grade?: number;
  dept?: string;
}

const LectureInfo = (props: Props) => {
  return (
    <div className={styles.lectureInfo}>
      <div className={styles.top}>
        <div className={styles.topLeft}>
          <span className={styles.boldText}>{props.courseName}</span>
          <span className={styles.regularText}>
            {props.professor}/{props.credits}
          </span>
        </div>
        <div className={styles.topRight}>
          <span className={styles.regularText}>{props.courseCode}</span>
          <Person sx={{ color: "#C4C4C4" }} />
          <span className={styles.greyText}>{props.studentNumber}</span>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>
          {props.dept}, {props.grade}학년
        </span>
      </div>
    </div>
  );
};

export default LectureInfo;
