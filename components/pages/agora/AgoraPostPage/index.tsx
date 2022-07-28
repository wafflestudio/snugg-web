import { FC, useMemo, useState } from "react";
import styles from "./styles.module.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { Divider, OutlinedInput } from "@mui/material";
import ClassPostComment from "../../../reused/agora/ClassPostComment";
import { AuthorSummary } from "../../../reused/agora/AuthorSummary";
import {
  Lecture,
  Story,
  useAgoraStorysDestroyMutation,
  useAgoraStorysRetrieveQuery,
} from "../../../../store/api/injected";
import { EditorContent, useEditor } from "@tiptap/react";
import { editorExtensions } from "../../../reused/QuestionEditor";
import {
  selectAccessToken,
  selectUserInfo,
  useAppSelector,
} from "../../../../store";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { forceType } from "../../../../utility";

interface Props {
  id: number;
}

export const AgoraPostPage: FC<Props> = ({ id }) => {
  const { data: story, error } = useAgoraStorysRetrieveQuery({ id });
  return error ? (
    <div>error</div>
  ) : story ? (
    <AgoraBox story={story} />
  ) : (
    <div>loading...</div>
  );
};

interface AgoraBoxProps {
  story: Story;
}

const AgoraBox: FC<AgoraBoxProps> = ({ story }) => {
  const me = useAppSelector(selectUserInfo);
  const token = useAppSelector(selectAccessToken);
  const [comment, setComment] = useState("");
  const content = useMemo(() => {
    if (story) {
      const rawContent = story.content;
      try {
        if (rawContent !== undefined) {
          return JSON.parse(rawContent);
        }
      } catch (err) {
        return rawContent;
      }
    } else {
      return null;
    }
  }, [story]);
  const postView = useEditor({
    editable: false,
    extensions: editorExtensions,
    content,
  });
  const router = useRouter();
  const lecture = forceType<Lecture>(story.lecture);
  const [destroyStory] = useAgoraStorysDestroyMutation();
  const onDeleteAgoraPost = async () => {
    if (!story) return;
    try {
      if (me === null) {
        toast.error("로그인하세요.");
        return;
      }
      if (token) {
        await destroyStory({ id: story.pk!! });
      } else {
        toast.error("로그인하세요.");
        return;
      }
      toast.success("게시글 삭제 완료");
      await router.push(`/agora/${lecture.pk}`);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.response?.data.detail);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainText}>
        <div className={styles.postTitle}>{story.title}</div>
        <div className={styles.mainTextHeader}>
          <AuthorSummary
            userName={story.writer!!.username}
            createdAt={story.created_at!!}
          />
          <div className={styles.headerButtons}>
            {/* href 고치기 */}
            <NextLink href={`/agora/${lecture.pk}/${story.pk}/edit`} passHref>
              <Button
                disabled={me?.pk !== story.writer!!.pk}
                className={styles.questionButton}
              >
                <EditIcon className={styles.questionButtonIcon} />
                <div>수정하기</div>
              </Button>
            </NextLink>
            <Button
              disabled={me?.pk !== story.writer!!.pk}
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
          toast.info("not implemented. comment: " + comment);
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
