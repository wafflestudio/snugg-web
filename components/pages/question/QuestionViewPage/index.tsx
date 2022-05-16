import styles from "./styles.module.scss";
import QuestionBox from "../../../reused/question/QuestionBox";
import AnswerBox from "../../../reused/question/AnswerBox";
import { QuestionPost } from "../../../../api";
import api from "../../../../api";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import AnswerEditor from "../../../reused/AnswerEditor";
interface Props {
  questionId: number;
  questionData: QuestionPost;
}

const QuestionViewPage = (Props: Props) => {
  const router = useRouter();
  const onDeleteQuestion = async () => {
    try {
      const response = await api.deleteQuestion({ id: Props.questionId });
      console.log(response);
      router.push("/question");
    } catch (error) {
      const err = error as AxiosError;
      console.log(err);
      window.alert(err.response?.data.detail);
    }
  };

  const [content, setContent] = useState<string>("");
  console.log(content);

  return (
    <div className={styles.mainContainer}>
      <QuestionBox
        onDeleteQuestion={onDeleteQuestion}
        questionData={Props.questionData}
      />
      <div className={styles.answerCount}>N개의 답변</div>
      <AnswerBox />
      <div className={styles.answerWriter}>
        <div className={styles.answerWriterTitle}>답변 작성하기</div>
        <AnswerEditor setContent={setContent} />
        <button className={styles.answerButton}>답변 등록하기</button>
      </div>
    </div>
  );
};

export default QuestionViewPage;
