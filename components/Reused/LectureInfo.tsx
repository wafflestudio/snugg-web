import React from "react";
import styles from "/styles/LectureInfo.module.scss";
import { Person } from "@mui/icons-material";
const LectureInfo = () => {
  return (
    <div className={styles.lectureInfo}>
      <div className={styles.top}>
        <div className={styles.topLeft}>
          <span className={styles.boldText}>대학영어</span>
          <span className={styles.regularText}>박여선/3학점</span>
        </div>
        <div className={styles.topRight}>
          <span className={styles.regularText}>L0441.000600 / 007</span>
          <Person sx={{ color: "#C4C4C4" }} />
          <span className={styles.greyText}>22</span>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>영어영문학과, 1학년</span>
      </div>
    </div>
  );
};

export default LectureInfo;
