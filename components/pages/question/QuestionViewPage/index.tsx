import styles from "./styles.module.scss";
import QuestionBox from "../../../reused/question/QuestionBox";
import AnswerBox from "../../../reused/question/AnswerBox";
import {
  AnswerPostInfo,
  PaginatedResponse,
  QuestionPostInfo,
} from "../../../../api";
import { useRouter } from "next/router";

import { FC, useState } from "react";
import AnswerEditor from "../../../reused/AnswerEditor";
import { selectUserInfo, useAppSelector } from "../../../../store";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import { enhancedApi } from "../../../../store/api/enhanced";
import { errorToString } from "../../../../utility";

interface Props {
  questionId: number;
  questionData: QuestionPostInfo;
  answerListData: PaginatedResponse<AnswerPostInfo>;
  answerNum: number;
}

const QuestionViewPage: FC<Props> = ({
  answerListData: { results },
  answerNum,
  questionData,
  questionId,
}) => {
  const router = useRouter();
  const userInfo = useAppSelector(selectUserInfo);
  const [destroyQuestion] = enhancedApi.useQnaPostsDestroyMutation();
  const [createAnswer] = enhancedApi.useQnaAnswersCreateMutation();
  const [destroyAnswer] = enhancedApi.useQnaAnswersDestroyMutation();
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

  return (
    <div className={styles.mainContainer}>
      <QuestionBox
        onDeleteQuestion={onDeleteQuestion}
        questionData={questionData}
      />
      <div className={styles.answerCount}>{answerNum}개의 답변</div>
      {results.map((item) => (
        <AnswerBox
          answerData={item}
          onDeleteAnswer={onDeleteAnswer}
          accepted={item.pk === questionData.accepted_answer}
          acceptable={
            questionData.writer.pk === userInfo?.pk &&
            questionData.accepted_answer === null
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
              handleCreateAnswer(questionData?.pk, content);
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
