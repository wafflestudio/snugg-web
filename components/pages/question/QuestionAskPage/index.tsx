import React from "react";
import { selectUserSignedIn, useAppSelector } from "../../../../store";
import { JSONContent } from "@tiptap/react";
import QuestionEditTemplate from "../../../reused/question/QuestionEditTemplate";
import { errorToString, forceType, useUploadPost } from "../../../../utility";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useQnaPostsCreateMutation } from "../../../../store/api/injected";

const QuestionAskPage = () => {
  const signedIn = useAppSelector(selectUserSignedIn);
  const router = useRouter();
  const uploadPost = useUploadPost();
  const [createPostMut] = useQnaPostsCreateMutation();
  const handleCreatePost = async (
    field: string,
    title: string,
    jsonContent: JSONContent,
    tags: string[]
  ) => {
    const result = await uploadPost(jsonContent, (content) =>
      createPostMut({
        postRequest: {
          field,
          title,
          content,
          tags: forceType<string>(tags),
        },
      })
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
          "질문을 등록할 수 없습니다: " +
            errorToString(result.uploadResult.error)
        );
      } else {
        toast.success("질문을 등록했습니다");
        await router.push("/question/" + result.uploadResult.data.pk);
      }
    }
  };

  return (
    <QuestionEditTemplate
      header={"새 질문 작성"}
      submitLabel={"질문 등록하기"}
      onSubmit={async (field, title, content, tags) => {
        if (signedIn) {
          await handleCreatePost(field, title, content, tags);
        } else {
          toast.warning("질문을 등록하려면 로그인하세요");
        }
      }}
    />
  );
};

export default QuestionAskPage;
