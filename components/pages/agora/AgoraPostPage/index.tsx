import { FC, useState } from "react";
import styles from "./styles.module.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { Divider, OutlinedInput } from "@mui/material";
import ClassPostComment from "../../../reused/agora/ClassPostComment";
import { AuthorSummary } from "../../../reused/agora/AuthorSummary";
import { AgoraPostInfo } from "../../../../api";
import { EditorContent, useEditor } from "@tiptap/react";
import { editorExtensions } from "../../../reused/QuestionEditor";

interface Props {
  post: AgoraPostInfo;
  onSubmitComment: (comment: string) => void;
}

export const AgoraPostPage: FC<Props> = ({ onSubmitComment, post }) => {
  const [comment, setComment] = useState("");

  const rawContent = post.content;
  let jsonContent: any;
  let success = false;
  try {
    if (rawContent !== undefined) {
      jsonContent = JSON.parse(rawContent);
      success = true;
    }
  } catch (err) {
    success = false;
  }
  const postView = useEditor({
    editable: false,
    extensions: editorExtensions,
    content: success ? jsonContent : rawContent,
  });

  return (
    <div className={styles.container}>
      <div className={styles.mainText}>
        <div className={styles.postTitle}>{post.title}</div>
        <div className={styles.mainTextHeader}>
          <AuthorSummary
            userName={post.writer.username}
            createdAt={post.created_at}
          />
          <div className={styles.postComment}>
            <ChatBubbleIcon className={styles.chatBubbleIcon} />
            <div>5</div>
          </div>
        </div>
        <EditorContent editor={postView} className={styles.postContent} />
      </div>
      <Divider className={styles.divider} />
      <form
        className={styles.writeComment}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitComment(comment);
        }}
      >
        <AccountCircleIcon className={styles.accountCircleIcon} />
        <OutlinedInput
          className={styles.input}
          placeholder="댓글을 남겨주세요."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <input type="submit" value="등록" className={styles.submit} />
      </form>
      {[0, 1, 2, 3, 4].map((item) => {
        return <ClassPostComment key={item} />;
      })}
    </div>
  );
};
