import styles from "../../../styles/agora/ClassPostPreview.module.scss";
import Link from "next/link";

interface Props {
  className: string;
  author: string;
}

const ClassPostPreview = ({ className, author }: Props) => {
  const postId = 123;
  return (
      <div className={styles.container}>
        <div className={styles.postInfo}>
          <div className={styles.postNum}>{postId}</div>
          <Link href={`/agora/${className}/${postId}`}>
          <a className={styles.postTitle}>게시글 제목을 입력하세요.</a>
          </Link>
          <Link href={`/profile/${author}`}>
            <a className={styles.postWriter}>{author}</a>
          </Link>
          <div className={styles.postTime}>2022.03.29</div>
        </div>
      </div>
  );
};

export default ClassPostPreview;
