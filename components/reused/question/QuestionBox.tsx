import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Button, Divider, Input } from "@mui/material";
import NextLink from "next/link";

import styles from "../../../styles/quesiton/QuestionAnswerBox.module.scss";
import { ListCommentInfo, QuestionPostInfo } from "../../../api";
import Moment from "react-moment";
import CommentBox from "./CommentBox";
import { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { editorExtensions } from "../QuestionEditor";
import { useAppDispatch, useAppSelector } from "../../../store";
import { createComment } from "../../../store/comments";

interface Props {
  questionData: QuestionPostInfo | null;
  onDeleteQuestion: () => {};
  token: string | undefined;
  questionId: number;
  commentData: ListCommentInfo;
}

const QuestionBox = (Props: Props) => {
  const styleBgs = [styles.bg1, styles.bg2, styles.bg3];
  const [commentOpen, setCommentOpen] = useState<boolean>(false);
  const me = useAppSelector((state) => state.users.data);

  const rawContent = Props.questionData?.content;
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
  console.log("raw content", rawContent);
  console.log("json content", jsonContent);

  const questionView = useEditor({
    editable: false,
    extensions: editorExtensions,
    content: success ? jsonContent : rawContent,
  });

  const [comment, setComment] = useState("");
  const dispatch = useAppDispatch();
  const handleCreateComment = (token: string, content: string) => {
    dispatch(
      createComment({
        type: "post",
        id: Props.questionId,
        params: { content: content },
        token: token,
      })
    )
      .then((action) => {
        if (createComment.fulfilled.match(action)) {
          alert("댓글 등록 완료");
        } else if (createComment.rejected.match(action)) {
          alert("댓글 등록 실패");
        }
      })
      .catch((reason) => {
        alert(`댓글 등록 실패 ${reason}`);
      });
  };
  console.log(Props.commentData.results.length);

  return (
    <div className={styles.questionBox}>
      <div className={styles.questionTitle}>
        <QuestionMarkIcon className={styles.questionMarkIcon} />
        <div>{Props.questionData?.title}</div>
      </div>
      <div className={styles.previewHeader1}>
        <span className={styles.previewHeader1Text}>
          {Props.questionData?.field}
        </span>
        {Props.questionData?.tags.map((tag, i) => (
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
            {Props.questionData?.writer.username} 님의 질문
          </div>
          <div className={styles.questionTime}>
            <Moment format={"YYYY.MM.DD"}>
              {Props.questionData?.created_at}
            </Moment>
          </div>
        </div>
        <div className={styles.questionButtons}>
          <NextLink href={`/question/${Props.questionData?.pk}/edit`} passHref>
            <Button
              disabled={me?.user.pk !== Props.questionData?.writer.pk}
              className={styles.questionButton}
            >
              <EditIcon className={styles.questionButtonIcon} />
              <div>수정하기</div>
            </Button>
          </NextLink>
          <Button
            disabled={me?.user.pk !== Props.questionData?.writer.pk}
            onClick={Props.onDeleteQuestion}
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
              if (Props.token !== undefined) {
                handleCreateComment(Props.token, comment);
              } else {
                alert("로그인하세요.");
              }
            }}
          >
            등록
          </Button>
        </div>
        {Props.commentData.results.length >= 1
          ? Props.commentData.results.map((item) => (
              <CommentBox key={item.pk} commentData={item} />
            ))
          : null}
      </div>
    </div>
  );
};

export default QuestionBox;
