import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Button, Divider, Input } from "@mui/material";
import NextLink from "next/link";

import styles from "../../../styles/quesiton/QuestionAnswerBox.module.scss";
import { QuestionPost } from "../../../api";
import Moment from "react-moment";
import CommentBox from "./CommentBox";
import { useState } from "react";

interface Props {
  questionData: QuestionPost | null;
  onDeleteQuestion: () => {};
}

const QuestionBox = (Props: Props) => {
  const styleBgs = [styles.bg1, styles.bg2, styles.bg3];
  const [commentOpen, setCommentOpen] = useState<boolean>(false);

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

      {/* dangerouslySetInnerHTML */}

      <div className={styles.questionText}>
        <LoremIpsum p={2} />
        <div>{Props.questionData?.title}</div>
      </div>

      <div className={styles.questionText}>{Props.questionData?.content}</div>
      <div className={styles.questionBottom}>
        <div className={styles.questionInfo}>
          <AccountCircleIcon className={styles.accountCircleIcon} />
          <div className={styles.questionUser}>
            {Props.questionData?.writer.username} 님의 질문
          </div>
          <div className={styles.questionTime}>
            <Moment format={"YYYY.MM.DD"}>
              {Props.questionData?.writer.created_at}
            </Moment>
          </div>
        </div>
        <div className={styles.questionButtons}>

          <NextLink href={`/question/${Props.questionData?.pk}/edit`} passHref>
            <Button className={styles.questionButton}>
              <EditIcon className={styles.questionButtonIcon} />
              <div>수정하기</div>
            </Button>
          </NextLink>
          <Button

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
