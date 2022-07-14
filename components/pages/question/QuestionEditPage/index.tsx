import React from "react";
import { updatePost } from "../../../../store/posts";
import { useAppDispatch, useAppSelector } from "../../../../store";
import api, { IMAGE_ENDPOINT, PostId, QuestionPost } from "../../../../api";
import QuestionEditTemplate from "../../../reused/question/QuestionEditTemplate";
import { JSONContent } from "@tiptap/react";
import { replaceImgSrc } from "../../../../utility";
import { useRouter } from "next/router";

interface Props {
  postId: number | null;
  questionData: QuestionPost;
}

const QuestionEditPage = (props: Props) => {
  const token = useAppSelector((state) => state.users.data?.token.access);
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
            tags
          },
          token
        })
      );
      if (!updatePost.fulfilled.match(updateAction)) {
        alert("질문 수정 실패");
        return;
      }
      const payload = updateAction.payload;
      const { newContent, blobs } = await replaceImgSrc(
        IMAGE_ENDPOINT,
        payload.presigned.fields.key,
        jsonContent
      );
      const content = JSON.stringify(newContent);
      const imagePromises: Promise<any>[] = blobs.map(({ blob, key }) =>
        api.uploadImages(payload.presigned.url, key, blob)
      );
      const updatePromise: Promise<any> = dispatch(
        updatePost({
          id: payload.pk,
          params: { field, title, content, tags },
          token
        })
      );
      await Promise.all(imagePromises.concat([updatePromise]));
      router.push(`/question/${props.postId}`);
      alert("질문 등록 완료");
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
          alert("로그인하세요.");
        }
      }}
      initialValue={props.questionData}
    />
  );
};

export default QuestionEditPage;
