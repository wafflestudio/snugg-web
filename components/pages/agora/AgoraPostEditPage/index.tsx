import React, { FC } from "react";
import { selectUserSignedIn, useAppSelector } from "../../../../store";
import { JSONContent } from "@tiptap/react";
import { useRouter } from "next/router";
import AgoraWriteTemplate from "../../../reused/agora/AgoraWriteTemplate";
import {
  Lecture,
  Story,
  useAgoraStorysUpdateMutation,
} from "../../../../store/api/injected";
import { errorToString, forceType, useUploadPost } from "../../../../utility";
import { toast } from "react-toastify";

interface Props {
  post: Story;
}

const AgoraPostEditPage: FC<Props> = ({ post }) => {
  const isSignedIn = useAppSelector(selectUserSignedIn);
  const router = useRouter();
  const lecture = forceType<Lecture>(post.lecture);
  const [updateStory] = useAgoraStorysUpdateMutation();
  const uploadPost = useUploadPost();
  const handleUpdateAgoraPost = async (
    title: string,
    jsonContent: JSONContent
  ) => {
    const result = await uploadPost(jsonContent, (content) =>
      updateStory({
        id: post.pk!!,
        storyRequest: {
          lecture: forceType<string>(lecture.pk),
          title,
          content,
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
          "게시글을 수정할 수 없습니다: " +
            errorToString(result.uploadResult.error)
        );
      } else {
        toast.success("게시글을 수정했습니다");
        await router.push(`/agora/${lecture.pk}/${post.pk}`);
      }
    }
  };

  return (
    <AgoraWriteTemplate
      header={"게시글 수정"}
      submitLabel={"게시글 수정하기"}
      initialValue={post}
      onSubmit={async (title, content) => {
        if (isSignedIn) {
          await handleUpdateAgoraPost(title, content);
        } else {
          toast.warning("로그인하세요.");
        }
      }}
    />
  );
};

export default AgoraPostEditPage;
