import React from "react";
import { createPost, updatePost } from "../../../../store/posts";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { JSONContent } from "@tiptap/react";
import api, { IMAGE_ENDPOINT } from "../../../../api";
import QuestionEditTemplate from "../../../reused/question/QuestionEditTemplate";
import { replaceImgSrc } from "../../../../utility";

const QuestionAskPage = () => {
  const token = useAppSelector((state) => state.users.data?.token.access);

  const dispatch = useAppDispatch();
  const handleCreatePost = (
    field: string,
    title: string,
    jsonContent: JSONContent,
    tags: string[],
    token: string
  ) => {
    (async () => {
      const createAction = await dispatch(
        createPost({
          params: {
            field,
            title,
            content: "placeholder",
            tags,
          },
          token,
        })
      );
      if (!createPost.fulfilled.match(createAction)) {
        alert("질문 등록 실패");
        return;
      }
      const payload = createAction.payload;
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
          token,
        })
      );
      await Promise.all(imagePromises.concat([updatePromise]));
      alert("질문 등록 완료");
    })();
  };

  return (
    <QuestionEditTemplate
      header={"새 질문 작성"}
      submitLabel={"질문 등록하기"}
      onSubmit={(field, title, content, tags) => {
        if (token !== undefined) {
          handleCreatePost(field, title, content, tags, token);
        } else {
          alert("로그인하세요.");
        }
      }}
    />
  );
};

export default QuestionAskPage;
