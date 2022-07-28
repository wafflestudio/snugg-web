import styles from "../../../styles/agora/ClassPostPreview.module.scss";
import Link from "next/link";
import Moment from "react-moment";
import { Lecture, Story } from "../../../store/api/injected";
import { forceType } from "../../../utility";

interface Props {
  post: Story;
}

const ClassPostPreview = ({ post }: Props) => {
  // wrong open api spec
  const lecture = forceType<Lecture>(post.lecture);
  return (
    <div className={styles.container}>
      <div className={styles.postInfo}>
        <div className={styles.postNum}>{post.pk}</div>
        <Link href={`/agora/${lecture.pk}/${post.pk}`}>
          <a className={styles.postTitle}>{post.title}</a>
        </Link>
        <Link href={`/profile/${post.writer!.pk}`}>
          <a className={styles.postWriter}>{post.writer!.username}</a>
        </Link>
        <div className={styles.postTime}>
          <Moment format={"YYYY.MM.DD"}>{post.created_at}</Moment>
        </div>
      </div>
    </div>
  );
};

export default ClassPostPreview;
