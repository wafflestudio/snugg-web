import CheckIcon from "@mui/icons-material/Check";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

import styles from "../../../styles/quesiton/QuestionAnswerBox.module.scss";

import { Button, Divider, Input } from "@mui/material";
import CommentBox from "./CommentBox";
import { FC, useState } from "react";
import Moment from "react-moment";
import {
  selectAccessToken,
  selectUserInfo,
  useAppSelector,
} from "../../../store";
import { toast } from "react-toastify";
import {
  Answer,
  useQnaCommentsCreateMutation,
  useQnaCommentsListQuery,
} from "../../../store/api/injected";
import { errorToString } from "../../../utility";
import { useQnaPostsAcceptAnswerMutation } from "../../../store/api/enhanced";
import { EditorContent, JSONContent, useEditor } from "@tiptap/react";
import { editorExtensions } from "../QuestionEditor";

interface Props {
  onDeleteAnswer: (id: number) => void;
  answerData: Answer;
  accepted: boolean;
  acceptable: boolean;
}

const AnswerBox: FC<Props> = ({
  answerData,
  onDeleteAnswer,
  accepted,
  acceptable,
}: Props) => {
  const [commentOpen, setCommentOpen] = useState<boolean>(false);
  const userInfo = useAppSelector(selectUserInfo);
  const [acceptAnswer] = useQnaPostsAcceptAnswerMutation();

  const onAcceptAnswer = () => {
    acceptAnswer({
      id: answerData.post,
      accepted_answer: answerData.pk!,
    }).then((result) => {
      if ("error" in result) {
        toast.error("채택할 수 없습니다: " + errorToString(result.error));
      } else {
        toast.success("채택되었습니다");
      }
    });
  };
  const rawContent = answerData.content;
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

  const { data: answerComments, error: answerCommentsError } =
    useQnaCommentsListQuery({ answer: answerData.pk });

  const token = useAppSelector(selectAccessToken);
  const [comment, setComment] = useState("");
  const [createComment] = useQnaCommentsCreateMutation();
  const handleCreateComment = (token: string, content: string) => {
    createComment({
      commentRequest: { content },
      answer: answerData.pk,
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
        {accepted ? (
          <>
            <CheckIcon className={styles.questionMarkIcon} />
            <div>채택 완료</div>
          </>
        ) : (
          acceptable && (
            <Button
              className={styles.checkButton}
              onClick={() => onAcceptAnswer()}
            >
              <CheckBoxOutlineBlankIcon />
              <div>채택하기</div>
            </Button>
          )
        )}
      </div>
      <EditorContent editor={answerView} className={styles.questionText} />
      <div className={styles.questionBottom}>
        <div className={styles.questionInfo}>
          <AccountCircleIcon className={styles.accountCircleIcon} />
          <div className={styles.questionUser}>
            {answerData.writer?.username} 님의 답변
          </div>
          <div className={styles.answerCount}>답변 20 채택 10</div>
          <div className={styles.questionTime}>
            <Moment format={"YYYY.MM.DD"}>{answerData.created_at}</Moment>
          </div>
        </div>
        <div className={styles.questionButtons}>
          <Button
            className={styles.questionButton}
            disabled={userInfo?.pk !== answerData.writer?.pk}
          >
            <EditIcon className={styles.questionButtonIcon} />
            <div>수정하기</div>
          </Button>
          <Button
            disabled={userInfo?.pk !== answerData.writer?.pk}
            onClick={() => {
              answerData.pk && onDeleteAnswer(answerData.pk);
            }}
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
              if (token !== undefined) {
                handleCreateComment(token, comment);
              } else {
                toast.error("로그인하세요.");
              }
            }}
          >
            등록
          </Button>
        </div>
        {!answerCommentsError &&
          answerComments &&
          answerComments.results!.map((item) => (
            <CommentBox key={item.pk} commentData={item} />
          ))}
      </div>
    </div>
  );
};

export default AnswerBox;
