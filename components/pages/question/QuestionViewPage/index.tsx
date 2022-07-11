import styles from "./styles.module.scss";
import QuestionBox from "../../../reused/question/QuestionBox";
import AnswerBox from "../../../reused/question/AnswerBox";
import {
  AnswerPostInfo,
  PaginatedResponse,
  QuestionPost,
} from "../../../../api";
import api from "../../../../api";
import { AxiosError } from "axios";
import { useRouter } from "next/router";

import { FC, useState } from "react";
import AnswerEditor from "../../../reused/AnswerEditor";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { createAnswer } from "../../../../store/answerPosts";
import { Button } from "@mui/material";

interface Props {
  questionId: number;
  questionData: QuestionPost;
  answerListData: PaginatedResponse<AnswerPostInfo>;
  answerNum: number;
}

const QuestionViewPage: FC<Props> = ({ answerListData: { results }, answerNum, questionData, questionId }) => {
  const router = useRouter();
  const me = useAppSelector((state) => state.users.data);
  const onDeleteQuestion = async () => {
    try {
      if (me === null) {
        console.log("로그인하세요");
        return;
      }
      const response = await api.deleteQuestion(
        { id: questionId },
        me.token.access
      );
      console.log(response);
      router.push("/question");
    } catch (error) {
      const err = error as AxiosError;
      console.log(err);
      window.alert(err.response?.data.detail);
    }
  };

  const [content, setContent] = useState<string>("");
  const token = useAppSelector((state) => state.users.data?.token.access);

  const dispatch = useAppDispatch();
  const handleCreateAnswer = (post: number, content: string, token: string) => {
    const params = { post, content };
    dispatch(createAnswer({ params, token }))
      .then((action) => {
        if (createAnswer.fulfilled.match(action)) {
          alert("답변 등록 완료");
          router.push(`/question/${questionId}`);
        } else if (createAnswer.rejected.match(action)) {
          alert("답변 등록 실패");
        }
      })
      .catch((reason) => {
        alert(`답변 등록 실패 ${reason}`);
      });
  };

  const onDeleteAnswer = async (id: number) => {
    try {
      const response = await api.deleteAnswer(
        id,
        me?.token.access ?? "" + " " + me?.token.refresh ?? ""
      );
      console.log(response);
      router.push("/question/" + questionId); // router.push는 새로고침이 강제됨.
    } catch (error) {
      const err = error as AxiosError;
      console.log(err);
      window.alert(err.response?.data.detail);
    }
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
          acceptable={questionData.writer.pk === me?.user.pk && questionData.accepted_answer === null}
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
            if (token !== undefined) {
              handleCreateAnswer(questionData?.pk, content, token);
            } else {
              alert("로그인하세요.");
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
