import React from "react";
import { updatePost } from "../../../../store/posts";
import { selectAccessToken, useAppDispatch, useAppSelector } from "../../../../store";
import api, { IMAGE_ENDPOINT, QuestionPost } from "../../../../api";
import QuestionEditTemplate from "../../../reused/question/QuestionEditTemplate";
import { JSONContent } from "@tiptap/react";
import { replaceImgSrc } from "../../../../utility";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

interface Props {
  postId: number | null;
  questionData: QuestionPost;
}

const QuestionEditPage = (props: Props) => {
  const token = useAppSelector(selectAccessToken);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleUpdatePost = (
    id: number,
    field: string,
    title: string,
    jsonContent: JSONContent,
    tags: string[],
    token: string
  ) => {
    (async () => {
      const updateAction = await dispatch(
        updatePost({
          id,
          params: {
            field,
            title,
            content: "placeholder",
            tags,
          },
          token,
        })
      );
      if (!updatePost.fulfilled.match(updateAction)) {
        toast.error("질문을 수정할 수 없습니다: " + updateAction.error.message);
        return;
      }
      const payload = updateAction.payload;
      const { newContent, blobs } = await replaceImgSrc(
        IMAGE_ENDPOINT,
        payload.presigned.fields.key,
        jsonContent
      );
      const content = JSON.stringify(newContent);
      const imagePromises = blobs.map(({ blob, key }) =>
        api.uploadImages(payload.presigned.url, key, blob)
      );
      const updatePromise = dispatch(
        updatePost({
          id: payload.pk,
          params: { field, title, content, tags },
          token,
        })
      );
      await Promise.all([...imagePromises, updatePromise]);
      toast.success("수정된 질문이 저장되었습니다");
      await router.push(`/question/${props.postId}`);
    })();
  };

  return (
    <QuestionEditTemplate
      header={"질문 수정하기"}
      submitLabel={"질문 수정하기"}
      onSubmit={(field, title, content, tags) => {
        if (props.postId !== null && token !== undefined) {
          handleUpdatePost(props.postId, field, title, content, tags, token);
        } else {
          toast.warning("질문을 수정하려면 로그인하세요");
        }
      }}
      initialValue={props.questionData}
    />
  );
};

export default QuestionEditPage;
