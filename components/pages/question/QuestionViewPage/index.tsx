import styles from "./styles.module.scss";
import QuestionBox from "../../../reused/question/QuestionBox";
import AnswerBox from "../../../reused/question/AnswerBox";
import { useRouter } from "next/router";

import { FC, useState } from "react";
import AnswerEditor from "../../../reused/AnswerEditor";
import { selectUserInfo, useAppSelector } from "../../../../store";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import { errorToString } from "../../../../utility";
import {
  useQnaAnswersCreateMutation,
  useQnaAnswersDestroyMutation, useQnaAnswersListQuery,
  useQnaPostsDestroyMutation,
  useQnaPostsRetrieveQuery,
} from "../../../../store/api/injected";
import { JSONContent } from "@tiptap/react";

interface Props {
  questionId: number;
}

const QuestionViewPage: FC<Props> = ({ questionId }) => {
  const router = useRouter();
  const userInfo = useAppSelector(selectUserInfo);
  const { data: question, error: questionError } = useQnaPostsRetrieveQuery({
    id: questionId,
  });
  const { data: answers, error: answersError } = useQnaAnswersListQuery({
    post: questionId
  });
  const [destroyQuestion] = useQnaPostsDestroyMutation();
  const [createAnswer] = useQnaAnswersCreateMutation();
  const [destroyAnswer] = useQnaAnswersDestroyMutation();
  const [content, setContent] = useState("");

  const onDeleteQuestion = () => {
    destroyQuestion({ id: questionId }).then((result) => {
      if ("error" in result) {
        toast.error(
          "질문을 삭제할 수 없습니다: " + errorToString(result.error)
        );
      } else {
        toast.success("질문을 삭제했습니다");
        return router.push("/question");
      }
    });
  };

  const handleCreateAnswer = (post: number, content: string) => {
    createAnswer({ answerRequest: { content, post } }).then((result) => {
      if ("error" in result) {
        toast.error(
          "답변을 등록할 수 없습니다: " + errorToString(result.error)
        );
      } else {
        toast.success("답변을 등록하였습니다");
        return router.push(`/question/${questionId}`);
      }
    });
  };

  const onDeleteAnswer = (id: number) => {
    destroyAnswer({ id }).then((result) => {
      if ("error" in result) {
        toast.error(
          "답변을 삭제할 수 없습니다: " + errorToString(result.error)
        );
      } else {
        toast.success("답변을 삭제했습니다");
      }
    });
  };

  if (questionError || answersError) return <span>error</span>;
  else if (!question || !answers) return <span>loading...</span>;
  else
    return (
      <div className={styles.mainContainer}>
        <QuestionBox
          onDeleteQuestion={onDeleteQuestion}
          questionData={question}
        />
        <div className={styles.answerCount}>{answers.results!!.length}개의 답변</div>
        {answers.results!!.map((item) => (
          <AnswerBox
            answerData={item}
            onDeleteAnswer={onDeleteAnswer}
            accepted={item.pk === question.accepted_answer}
            acceptable={
              question.writer!!.pk === userInfo?.pk &&
              question.accepted_answer === null
            }
            key={item.pk}
          />
        ))}

        <div className={styles.answerWriter}>
          <div className={styles.answerWriterTitle}>답변 작성하기</div>
          <AnswerEditor setContent={setContent} />
          <Button
            className={styles.answerButton}
            onClick={(e) => {
              e.preventDefault();
              if (userInfo !== undefined) {
                handleCreateAnswer(question.pk!!, content);
              } else {
                toast.warning("답변을 달려면 로그인하세요");
              }
            }}
          >
            답변 등록하기
          </Button>
        </div>
      </div>
    );
};

export default QuestionViewPage;
