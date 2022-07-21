import { FC, useState } from "react";
import styles from "./styles.module.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { Divider, OutlinedInput } from "@mui/material";
import ClassPostComment from "../../../reused/agora/ClassPostComment";
import { AuthorSummary } from "../../../reused/agora/AuthorSummary";
import api, { AgoraPostInfo } from "../../../../api";
import { EditorContent, useEditor } from "@tiptap/react";
import { editorExtensions } from "../../../reused/QuestionEditor";
import { useAppSelector } from "../../../../store";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { AxiosError } from "axios";

interface Props {
  post: AgoraPostInfo;
  onSubmitComment: (comment: string) => void;
}

export const AgoraPostPage: FC<Props> = ({ onSubmitComment, post }) => {
  const me = useAppSelector((state) => state.users.data);
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

  const router = useRouter();
  const onDeleteAgoraPost = async () => {
    try {
      if (me === null) {
        window.alert("로그인하세요");
        return;
      }
      const response = await api.deleteAgoraPost(post.pk, me.token.access);
      window.alert("게시글 삭제 완료");
      // console.log(response);
      // 고치기 (AgoraPostInfo.lecture type 수정하기!)
      router.push(`/agora/`);
    } catch (error) {
      const err = error as AxiosError;
      // console.log(err);
      window.alert(err.response?.data.detail);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainText}>
        <div className={styles.postTitle}>{post.title}</div>
        <div className={styles.mainTextHeader}>
          <AuthorSummary
            userName={post.writer.username}
            createdAt={post.created_at}
          />
          <div className={styles.headerButtons}>
            {/* href 고치기 */}
            <NextLink href={`/agora/`} passHref>
              <Button
                disabled={me?.user.pk !== post.writer.pk}
                className={styles.questionButton}
              >
                <EditIcon className={styles.questionButtonIcon} />
                <div>수정하기</div>
              </Button>
            </NextLink>
            <Button
              disabled={me?.user.pk !== post.writer.pk}
              className={styles.questionButton}
              onClick={onDeleteAgoraPost}
            >
              <DeleteIcon className={styles.questionButtonIcon} />
              <div>삭제하기</div>
            </Button>
            <div className={styles.postComment}>
              <ChatBubbleIcon className={styles.chatBubbleIcon} />
              <div>5</div>
            </div>
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
