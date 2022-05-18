import styles from "../../../styles/agora/ClassPostComment.module.scss";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { FC } from "react";

interface Props {
}

const ClassPostComment: FC<Props> = () => {
  return (
    <div className={styles.container}>
      <div className={styles.commentInfo}>
        <AccountCircleIcon className={styles.accountCircleIcon} />
        <div className={styles.postUser}>username</div>
        <div className={styles.postTime}>2022.02.28</div>
      </div>
      <div className={styles.commentText}>
        <p>
          Lorem ipsum odor amet, consectetuer adipiscing elit. Dictum adipiscing mauris ligula vitae efficitur? Mi
          egestas pharetra efficitur diam gravida gravida placerat, dui adipiscing. Pharetra elementum ornare fusce hac
          nibh felis. Sociosqu mauris ultrices ultrices nulla vestibulum etiam magna. Dignissim hac velit integer turpis
          mauris. Senectus hendrerit senectus maximus, in fermentum nostra bibendum feugiat.
        </p>
      </div>
    </div>
  );
};

export default ClassPostComment;
