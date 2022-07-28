import React from "react";
import { selectAccessToken, useAppSelector } from "../../../../store";
import { QuestionPost } from "../../../../api";
import QuestionEditTemplate from "../../../reused/question/QuestionEditTemplate";
import { JSONContent } from "@tiptap/react";
import { errorToString, useUploadPost } from "../../../../utility";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useQnaPostsUpdateMutation } from "../../../../store/api/injected";

interface Props {
  postId: number | null;
  questionData: QuestionPost;
}

const QuestionEditPage = (props: Props) => {
  const token = useAppSelector(selectAccessToken);
  const router = useRouter();
  const uploadPost = useUploadPost();
  const [updatePost] = useQnaPostsUpdateMutation();
  const handleUpdatePost = async (
    id: number,
    field: string,
    title: string,
    jsonContent: JSONContent,
    tags: string[]
  ) => {
    const result = await uploadPost(field, title, jsonContent, tags, (arg) =>
      updatePost({ id, postRequest: arg })
    );
    if (result.presError) {
      toast.error(
        "이미지를 저장할 수 없습니다: " + errorToString(result.presError)
      );
    } else if (result.imageError) {
      toast.error("이미지를 저장할 수 없습니다: " + result.imageError);
    } else if (result.uploadResult) {
      if ("error" in result.uploadResult) {
        toast.error(
          "질문을 수정할 수 없습니다: " +
            errorToString(result.uploadResult.error)
        );
      } else {
        toast.success("질문을 수정했습니다");
        await router.push("/question/" + result.uploadResult.data.pk);
      }
    }
  };

  return (
    <QuestionEditTemplate
      header={"질문 수정하기"}
      submitLabel={"질문 수정하기"}
      onSubmit={async (field, title, content, tags) => {
        if (props.postId !== null && token !== undefined) {
          await handleUpdatePost(props.postId, field, title, content, tags);
        } else {
          toast.warning("질문을 수정하려면 로그인하세요");
        }
      }}
      initialValue={props.questionData}
    />
  );
};

export default QuestionEditPage;
