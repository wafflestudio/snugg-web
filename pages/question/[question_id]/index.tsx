import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import styles from "../../../styles/QuestionAnswerPage.module.scss";
import QuestionBoxComponent from "../../../components/Reused/QuestionBoxComponent";
import AnswerBoxComponent from "../../../components/Reused/AnswerBoxComponent";
import { queryToString } from "../../../utility";
import { useEffect, useState } from "react";
import { QuestionResponse } from "../../../api";
import api from "../../../api";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
interface Props {
  questionId: number;
  questionData: QuestionResponse;
}

const QuestionAnswerPage: NextPage<Props> = (Props: Props) => {
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
      <QuestionBoxComponent
        onDeleteQuestion={onDeleteQuestion}
        questionData={Props.questionData}
      />
      <div className={styles.answerCount}>N개의 답변</div>
      <AnswerBoxComponent />
      <div className={styles.answerWriter}>
        <div>답변 작성하기</div>
        <input />
        <button>답변 등록하기</button>
      </div>
    </div>
  );
};

export default QuestionAnswerPage;

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const response = await axios.get(
    `http://54.180.123.137/qna/posts/${queryToString(
      context.params?.question_id
    )}`
  );
  //console.log(response);
  //하드코딩 안하니까 에러뜸..
  return {
    props: {
      questionData: response.data,

      questionId: Number(queryToString(context.params?.question_id)),
    },
  };
};
