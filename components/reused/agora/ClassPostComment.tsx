import styles from "../../../styles/agora/ClassPostComment.module.scss";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoremIpsum from "react-lorem-ipsum";

interface Props {}

const ClassPostComment = (props: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.commentInfo}>
        <AccountCircleIcon className={styles.accountCircleIcon} />
        <div className={styles.postUser}>username</div>
        <div className={styles.postTime}>2022.02.28</div>
      </div>
      <div className={styles.commentText}>
        <LoremIpsum p={1} />
      </div>
    </div>
  );
};

export default ClassPostComment;
