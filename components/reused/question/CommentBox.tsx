import React from "react";
import styles from "../../../styles/quesiton/CommentBox.module.scss";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button } from "@mui/material";

const CommentBox = () => {
  return (
    <div className={styles.commentContainer}>
      <div className={styles.upperLine}>
        <AccountCircleIcon className={styles.accountCircleIcon} />
        <div>Lörem ipsum nejänyngen nettokrati gelig bokashi, hingen.</div>
      </div>
      <div className={styles.lowerLine}>
        <Button>수정하기</Button>
        <Button>삭제하기</Button>
        <div>2022.03.23 14:57</div>
      </div>
    </div>
  );
};

export default CommentBox;
