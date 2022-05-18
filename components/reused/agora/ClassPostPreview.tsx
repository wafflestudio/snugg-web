import styles from "../../../styles/agora/ClassPostPreview.module.scss";
import Link from "next/link";

interface Props {
  className: string;
}

const ClassPostPreview = ({ className }: Props) => {
  const postId = 123;
  return (
    <Link href={`/agora/${className}/${postId}`}>
      <a className={styles.container}>
        <div className={styles.postInfo}>
          <div className={styles.postNum}>{postId}</div>
          <div className={styles.postTitle}>게시글 제목을 입력하세요.</div>
          <div className={styles.postWriter}>작성자</div>
          <div className={styles.postTime}>2022.03.29</div>
        </div>
      </a>
    </Link>
  );
};

export default ClassPostPreview;
