import React from "react";
import styles from "../../../styles/quesiton/SimplifiedPreview.module.scss";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const SimplifiedPreview = () => {
  return (
    <div className={styles.questionPreview}>
      <BookmarkIcon className={styles.previewContent1} />
      <div className={styles.previewContent2}>질문 제목을 입력하세요</div>
      <div className={styles.previewContent3}>전공분야</div>
      <div className={styles.previewContent4}>#태그1</div>
    </div>
  );
};

export default SimplifiedPreview;
