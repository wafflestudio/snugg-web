import { FC } from "react";
import styles from "../../../styles/agora/AuthorSummary.module.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Link from "next/link";

interface Props {
  userName: string;
  createdAt: string;
}

export const AuthorSummary: FC<Props> = ({ userName, createdAt }) => {
  return (
    <div className={styles.authorSummary}>
      <AccountCircleIcon className={styles.accountCircleIcon} />
      <Link href={`/profile/${userName}`}>
        <a className={styles.user}>{userName}</a>
      </Link>
      <div className={styles.createdAt}>{createdAt}</div>
    </div>
  );
};
