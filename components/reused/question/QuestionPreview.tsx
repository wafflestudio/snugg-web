import React, { FunctionComponent, useMemo } from "react";
import styles from "../../../styles/quesiton/QuestionPreview.module.scss";
import NextLink from "next/link";
import { generateHTML, JSONContent } from "@tiptap/react";
import { Post } from "../../../store/api/injected";
import { forceType } from "../../../utility";
import { editorExtensions } from "../QuestionEditor";

interface Props {
  post: Post;
}

const summarize = (content: string) => content.substring(0, 300);

const QuestionPreview: FunctionComponent<Props> = ({ post }) => {
  const styleBgs = [styles.bg1, styles.bg2, styles.bg3];
  const summary = useMemo(() => {
    try {
      const content = JSON.parse(post.content) as JSONContent;
      const html = generateHTML(content, editorExtensions);
      const dom = new DOMParser().parseFromString(html, "text/html");
      return summarize(dom.documentElement.innerText);
    } catch (e) {
      return summarize(post.content);
    }
  }, [post.content]);

  const tags = forceType<string[]>(post.tags);

  return (
    <div className={styles.preview}>
      <div className={styles.previewHeader1}>
        <span className={styles.previewHeader1Text}>{post.field}</span>
        {tags.map((tag, i) => (
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
