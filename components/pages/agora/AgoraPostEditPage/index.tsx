import React, { FC } from "react";
import { createAgoraPost, updateAgoraPost } from "../../../../store/agoraPosts";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { JSONContent } from "@tiptap/react";
import api, {
  AgoraLectureInfo,
  AgoraPostInfo,
  IMAGE_ENDPOINT,
} from "../../../../api";
import { replaceImgSrc } from "../../../../utility";
import { useRouter } from "next/router";
import AgoraWriteTemplate from "../../../reused/agora/AgoraWriteTemplate";

interface Props {
  post: AgoraPostInfo;
}

const AgoraPostEditPage: FC<Props> = ({ post }) => {
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
        updateAgoraPost({
          id: post.pk,
          params: {
            lecture: post.lecture.pk,
            title,
            content: JSON.stringify(jsonContent),
          },
          token,
        })
      );
      if (!updateAgoraPost.fulfilled.match(createAction)) {
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

      router.push(`/agora/${post.lecture.pk}`);
      alert("게시글 수정 완료");
    })();
  };

  return (
    <AgoraWriteTemplate
      header={"게시글 수정"}
      submitLabel={"게시글 수정하기"}
      initialValue={post}
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

export default AgoraPostEditPage;
