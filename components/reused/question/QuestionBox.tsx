import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Button, Divider, Input } from "@mui/material";
import NextLink from "next/link";

import styles from "../../../styles/quesiton/QuestionAnswerBox.module.scss";
import Moment from "react-moment";
import CommentBox from "./CommentBox";
import { useMemo, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { editorExtensions } from "../QuestionEditor";
import { selectUserInfo, useAppSelector } from "../../../store";
import { Post } from "../../../store/api/injected";
import { forceType } from "../../../utility";

interface Props {
  questionData: Post;
  onDeleteQuestion: () => void;
}

const QuestionBox = ({ onDeleteQuestion, questionData }: Props) => {
  const styleBgs = [styles.bg1, styles.bg2, styles.bg3];
  const [commentOpen, setCommentOpen] = useState(false);
  const userInfo = useAppSelector(selectUserInfo);
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
          <Input disableUnderline={true} placeholder="댓글을 남겨주세요." />
          <Button>등록</Button>
        </div>
        <CommentBox />
        <CommentBox />
      </div>
    </div>
  );
};

export default QuestionBox;
