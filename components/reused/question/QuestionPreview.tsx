import React, { FunctionComponent, useMemo } from "react";
import styles from "../../../styles/quesiton/QuestionPreview.module.scss";
import { QuestionPost } from "../../../api";
import NextLink from "next/link";

interface Props {
  post: QuestionPost;
}

const summarize = (content: string) => content.substring(0, 300);

const QuestionPreview: FunctionComponent<Props> = ({ post }) => {
  const styleBgs = [styles.bg1, styles.bg2, styles.bg3];
  const summary = useMemo(() => summarize(post.content), [post.content]);
  return (
    <div className={styles.preview}>
      <div className={styles.previewHeader1}>
        <span className={styles.previewHeader1Text}>{post.field}</span>
        {post.tags.map((tag, i) => (
          <NextLink href={"/question/tags"} passHref key={tag}>
            <div
              key={tag}
              className={`${styles.previewHeaderTag} ${styleBgs[i % 3]}`}
            >
              #{tag}
            </div>
          </NextLink>
        ))}
      </div>
      <NextLink href={`/question/${post.pk}`} passHref>
        <a className={styles.previewHeader2}>{post.title}</a>
      </NextLink>
      <div className={styles.previewBody}>{summary}</div>
    </div>
  );
};

export default QuestionPreview;
