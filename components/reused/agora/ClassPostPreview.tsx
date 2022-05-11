import styles from "../../../styles/agora/ClassPostPreview.module.scss";

interface Props {}

const ClassPostPreview = (props: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.postInfo}>
        <div className={styles.postNum}>000</div>
        <div className={styles.postTitle}>게시글 제목을 입력하세요.</div>
        <div className={styles.postWriter}>작성자</div>
        <div className={styles.postTime}>2022.03.29</div>
      </div>
    </div>
  );
};

export default ClassPostPreview;
