import styles from "./styles.module.scss";
import QuestionBox from "../../../reused/question/QuestionBox";
import AnswerBox from "../../../reused/question/AnswerBox";
import { useEffect, useState } from "react";
import { QuestionResponse } from "../../../../api";
import api from "../../../../api";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
interface Props {
  questionId: number;
  questionData: QuestionResponse;
}

const QuestionViewPage = (Props: Props) => {
  const router = useRouter();
  const onDeleteQuestion = async () => {
    try {
      const response = await api.questionDelete({ id: Props.questionId });
      console.log(response);
      router.push("/question");
    } catch (error) {
      const err = error as AxiosError;
      console.log(err);
      window.alert(err.response?.data.detail);
    }
  };

  useEffect(() => {
    console.log(Props.questionData);
  }, []);

  return (
    <div className={styles.mainContainer}>
      <QuestionBox
        onDeleteQuestion={onDeleteQuestion}
        questionData={Props.questionData}
      />
      <div className={styles.answerCount}>N개의 답변</div>
      <AnswerBox />
      <div className={styles.answerWriter}>
        <div>답변 작성하기</div>
        <input />
        <button>답변 등록하기</button>
      </div>
    </div>
  );
};

export default QuestionViewPage;
