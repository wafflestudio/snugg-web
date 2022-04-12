import React, { FunctionComponent, useMemo } from "react";
import styles from "../../styles/Preview.module.scss";
import { Post } from "../../api";

interface Props {
  post: Post;
}

const summarize = (content: string) => content.substring(0, 300);

const PreviewComponent: FunctionComponent<Props> = ({ post }) => {
  const styleBgs = [styles.bg1, styles.bg2, styles.bg3];
  const summary = useMemo(() => summarize(post.content), [post.content]);
  return (
    <div className={styles.preview}>
      <div className={styles.previewHeader1}>
        <span className={styles.previewHeader1Text}>{post.field}</span>
        {post.tags.map((tag, i) => (
          <div
            key={tag}
            className={`${styles.previewHeaderTag} ${styleBgs[i % 3]}`}
          >
            #{tag}
          </div>
        ))}
      </div>
      <div className={styles.previewHeader2}>{post.title}</div>
      <div className={styles.previewBody}>{summary}</div>
    </div>
  );
};

export default PreviewComponent;
