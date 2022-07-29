import React, { FunctionComponent, useMemo } from "react";
import styles from "../../../styles/quesiton/QuestionPreview.module.scss";
import NextLink from "next/link";
import { generateHTML } from "@tiptap/html";
import { Post } from "../../../store/api/injected";
import { forceType } from "../../../utility";
import { htmlToText } from "html-to-text";
import { editorExtensions } from "../QuestionEditor";

interface Props {
  post: Post;
}

const summarize = (content: string) => content.substring(0, 300);

const QuestionPreview: FunctionComponent<Props> = ({ post }) => {
  const styleBgs = [styles.bg1, styles.bg2, styles.bg3];
  const content = useMemo(() => {
    try {
      const json = JSON.parse(post.content);
      // @ts-ignore weird type problem of tiptap
      return generateHTML(json, editorExtensions);
    } catch (e) {
      if (e instanceof SyntaxError) return post.content;
      else {
        console.log(e);
        throw e;
      }
    }
  }, [post.content]);
  const summary = useMemo(() => {
    return summarize(
      htmlToText(content, {
        selectors: [{ selector: "img", format: "skip" }],
      })
    );
  }, [content]);

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
