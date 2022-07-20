import styles from "../../../styles/agora/ClassPostPreview.module.scss";
import Link from "next/link";
import { AgoraPostInfo } from "../../../api";
import Moment from "react-moment";

interface Props {
  post: AgoraPostInfo;
}

const ClassPostPreview = ({ post }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.postInfo}>
        <div className={styles.postNum}>{post.pk}</div>
        <Link href={`/agora/${post.lecture.pk}/${post.pk}`}>
          <a className={styles.postTitle}>{post.title}</a>
        </Link>
        <Link href={`/profile/${post.writer.pk}`}>
          <a className={styles.postWriter}>{post.writer.username}</a>
        </Link>
        <div className={styles.postTime}>
          <Moment format={"YYYY.MM.DD"}>{post.created_at}</Moment>
        </div>
      </div>
    </div>
  );
};

export default ClassPostPreview;
