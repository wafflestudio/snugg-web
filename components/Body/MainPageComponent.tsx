import React, { FunctionComponent } from "react";
import styles from "../../styles/MainPage.module.scss";
import PreviewComponent from "../Reused/PreviewComponent";
import { Post } from "../../api";

interface Props {
  posts: Post[];
}
const MainPage: FunctionComponent<Props> = ({ posts }) => {
  return (
    <div className={styles.mainPage}>
      <div className={styles.mainHeader}>최근 질문</div>
      {posts.map((post) => (
        <PreviewComponent key={post.pk} post={post} />
      ))}
    </div>
  );
};

export default MainPage;
