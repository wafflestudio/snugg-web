import React from "react";
import { createPost, updatePost } from "../../../../store/posts";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { JSONContent } from "@tiptap/react";
import api, { IMAGE_ENDPOINT } from "../../../../api";
import QuestionEditTemplate from "../../../reused/question/QuestionEditTemplate";
import { replaceImgSrc } from "../../../../utility";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const QuestionAskPage = () => {
  const token = useAppSelector((state) => state.users.data?.token.access);
  const router = useRouter();
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
        toast.error("질문을 등록할 수 없습니다: " + createAction.error.message);
        return;
      }
      const payload = createAction.payload;
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

      toast.success("질문을 등록하였습니다");
      await router.push("/question");
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
          toast.warning("질문을 등록하려면 로그인하세요");
        }
      }}
    />
  );
};

export default QuestionAskPage;
