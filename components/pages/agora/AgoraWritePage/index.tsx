import React, { FC } from "react";
import { createAgoraPost, updateAgoraPost } from "../../../../store/agoraPosts";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { JSONContent } from "@tiptap/react";
import api, { AgoraLectureInfo, IMAGE_ENDPOINT } from "../../../../api";
import { replaceImgSrc } from "../../../../utility";
import { useRouter } from "next/router";
import AgoraWriteTemplate from "../../../reused/agora/AgoraWriteTemplate";

interface Props {
  lectureId: number;
  lecture: AgoraLectureInfo;
}

const AgoraWritePage: FC<Props> = ({ lectureId, lecture }) => {
  const token = useAppSelector((state) => state.users.data?.token.access);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleCreateAgoraPost = (
    title: string,
    jsonContent: JSONContent,
    token: string
  ) => {
    (async () => {
      const createAction = await dispatch(
        createAgoraPost({
          params: {
            lecture: lectureId,
            title,
            content: "placeholder",
          },
          token,
        })
      );
      if (!createAgoraPost.fulfilled.match(createAction)) {
        alert("게시글 등록 실패");
        return;
      }
      // const payload = createAction.payload;
      // const { newContent, blobs } = await replaceImgSrc(
      //   IMAGE_ENDPOINT,
      //   payload.presigned.fields.key,
      //   jsonContent
      // );
      // const content = JSON.stringify(newContent);
      // const imagePromises: Promise<any>[] = blobs.map(({ blob, key }) =>
      //   api.uploadImages(payload.presigned.url, key, blob)
      // );
      // const updatePromise: Promise<any> = dispatch(
      //   updateAgoraPost({
      //     id: payload.pk,
      //     params: { lecture: lectureId, title: title, content: content },
      //     token,
      //   })
      // );
      // await Promise.all(imagePromises.concat([updatePromise]));

      router.push(`/agora/${lectureId}`);
      alert("게시글 등록 완료");
    })();
  };

  return (
    <AgoraWriteTemplate
      header={"새 게시글 작성"}
      submitLabel={"게시글 등록하기"}
      onSubmit={(title, content) => {
        if (token !== undefined) {
          handleCreateAgoraPost(title, content, token);
        } else {
          alert("로그인하세요.");
        }
      }}
    />
  );
};

export default AgoraWritePage;
