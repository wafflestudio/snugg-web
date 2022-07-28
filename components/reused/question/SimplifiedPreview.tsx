import React, { FC } from "react";
import styles from "../../../styles/quesiton/SimplifiedPreview.module.scss";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { AnswerPostInfo, QuestionPost } from "api";
import { EditorContent, JSONContent, useEditor } from "@tiptap/react";
import { editorExtensions } from "../QuestionEditor";

interface Props {
  post?: QuestionPost;
  answer?: AnswerPostInfo;
}

const SimplifiedPreview: FC<Props> = ({ post, answer }) => {
  const summarize = (content: string) => content.substring(0, 15);

  const rawContent = answer?.content;
  let jsonContent: JSONContent | undefined;
  let success = false;
  try {
    if (rawContent !== undefined) {
      jsonContent = JSON.parse(rawContent);
      success = true;
    }
  } catch (err) {
    success = false;
  }

  const answerView = useEditor({
    editable: false,
    extensions: editorExtensions,
    content: success ? jsonContent : rawContent,
  });

  return (
    <div className={styles.questionPreview}>
      <BookmarkIcon className={styles.previewContent1} />
      {post && (
        <div className={styles.previewContent2}>{summarize(post.title)}</div>
      )}
      {answer && (
        <EditorContent
          editor={answerView}
          className={styles.previewContent2_2}
        />
      )}
      {post && <div className={styles.previewContent3}>{post.field}</div>}
      {post && post.tags.length !== 0 && (
        <div className={styles.previewContent4}>{post.tags[1]}</div>
      )}
    </div>
  );
};

export default SimplifiedPreview;
