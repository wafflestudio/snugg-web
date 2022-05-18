import React from "react";
import styles from "../../../styles/agora/LectureInfo.module.scss";
import { Person } from "@mui/icons-material";
import Link from "next/link";

interface Props {
  courseName?: string;
  professor?: string;
  credits?: number;
  courseCode?: string;
  studentNumber?: number;
  grade?: number;
  dept?: string;
}

const LectureInfo = ({
  courseCode,
  courseName,
  credits,
  dept,
  grade,
  professor,
  studentNumber,
}: Props) => {
  return (
    <Link href={`/agora/${courseName}`}>
      <a className={styles.lectureInfo}>
        <div className={styles.top}>
          <div className={styles.topLeft}>
            <span className={`${styles.boldText} ${styles.courseName}`}>
              {courseName}
            </span>
            <span className={styles.regularText}>
              {professor}/{credits}
            </span>
          </div>
          <div className={styles.topRight}>
            <span className={styles.regularText}>{courseCode}</span>
            <Person sx={{ color: "#C4C4C4" }} />
            <span className={styles.greyText}>{studentNumber}</span>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>
            {dept}, {grade}학년
          </span>
        </div>
      </a>
    </Link>
  );
};

export default LectureInfo;
