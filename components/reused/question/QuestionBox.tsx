import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Button, Divider, Input } from "@mui/material";
import NextLink from "next/link";

import styles from "../../../styles/quesiton/QuestionAnswerBox.module.scss";
import { ListCommentInfo } from "../../../api";
import Moment from "react-moment";
import CommentBox from "./CommentBox";
import { useMemo, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { editorExtensions } from "../QuestionEditor";
import {
  selectUserInfo,
  selectUserSignedIn,
  useAppSelector,
} from "../../../store";
import {
  Post,
  useQnaCommentsCreateMutation,
} from "../../../store/api/injected";
import { errorToString, forceType } from "../../../utility";
import { toast } from "react-toastify";

interface Props {
  questionData: Post;
  onDeleteQuestion: () => void;
  commentData: ListCommentInfo;
}

const QuestionBox = ({
  onDeleteQuestion,
  questionData,
  commentData,
}: Props) => {
  const styleBgs = [styles.bg1, styles.bg2, styles.bg3];
  const [commentOpen, setCommentOpen] = useState(false);
  const userInfo = useAppSelector(selectUserInfo);
  const isSignedIn = useAppSelector(selectUserSignedIn);
  const content = useMemo(() => {
    const rawContent = questionData.content;
    try {
      if (rawContent !== undefined) {
        return JSON.parse(rawContent);
      }
    } catch (err) {
      return rawContent;
    }
  }, [questionData.content]);
  const questionView = useEditor({
    editable: false,
    extensions: editorExtensions,
    content,
  });
  const tags = forceType<string[]>(questionData.tags);

  const [comment, setComment] = useState("");
  const [createComment] = useQnaCommentsCreateMutation();
  const handleCreateComment = (content: string) => {
    createComment({
      commentRequest: { content },
      post: questionData.pk,
    }).then((result) => {
      if ("error" in result) {
        toast.error(
          "댓글을 등록할 수 없습니다: " + errorToString(result.error)
        );
      } else {
        toast.success("댓글을 등록했습니다");
      }
    });
  };

  return (
    <div className={styles.questionBox}>
      <div className={styles.questionTitle}>
        <QuestionMarkIcon className={styles.questionMarkIcon} />
        <div>{questionData.title}</div>
      </div>
      <div className={styles.previewHeader1}>
        <span className={styles.previewHeader1Text}>{questionData.field}</span>
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
        <MoreHorizIcon className={styles.moreTags} />
      </div>
      <EditorContent editor={questionView} className={styles.questionText} />
      <div className={styles.questionBottom}>
        <div className={styles.questionInfo}>
          <AccountCircleIcon className={styles.accountCircleIcon} />
          <div className={styles.questionUser}>
            {questionData.writer!.username} 님의 질문
          </div>
          <div className={styles.questionTime}>
            <Moment format={"YYYY.MM.DD"}>{questionData.created_at}</Moment>
          </div>
        </div>
        <div className={styles.questionButtons}>
          <NextLink href={`/question/${questionData?.pk}/edit`} passHref>
            <Button
              disabled={userInfo?.pk !== questionData.writer!.pk}
              className={styles.questionButton}
            >
              <EditIcon className={styles.questionButtonIcon} />
              <div>수정하기</div>
            </Button>
          </NextLink>
          <Button
            disabled={userInfo?.pk !== questionData.writer!.pk}
            onClick={onDeleteQuestion}
            className={styles.questionButton}
          >
            <DeleteIcon className={styles.questionButtonIcon} />
            <div>삭제하기</div>
          </Button>
          <Button
            className={styles.questionButton}
            onClick={() => setCommentOpen(!commentOpen)}
          >
            <ChatBubbleIcon className={styles.questionButtonIcon} />
            <div>댓글쓰기</div>
          </Button>
        </div>
      </div>
      <div
        className={commentOpen ? styles.commentSection : styles.commentClosed}
      >
        <Divider className={styles.commentDivider} />
        <div className={styles.commentTitle}>N개의 댓글</div>
        <div className={styles.writeComment}>
          <AccountCircleIcon className={styles.accountCircleIcon} />
          <Input
            disableUnderline={true}
            placeholder="댓글을 남겨주세요."
            onChangeCapture={(e: React.ChangeEvent<HTMLInputElement>) =>
              setComment(e.target.value)
            }
          />
          <Button
            onClick={(e) => {
              e.preventDefault();
              if (isSignedIn) {
                handleCreateComment(comment);
              } else {
                toast.error("로그인하세요.");
              }
            }}
          >
            등록
          </Button>
        </div>
        {commentData.results.length >= 1
          ? commentData.results.map((item) => (
              <CommentBox key={item.pk} commentData={item} />
            ))
          : null}
      </div>
    </div>
  );
};

export default QuestionBox;
