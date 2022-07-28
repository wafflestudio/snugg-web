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
import { forceType } from "../../../../utility";
import { toast } from "react-toastify";

interface Props {
  post: Story;
}

const AgoraPostEditPage: FC<Props> = ({ post }) => {
  const isSignedIn = useAppSelector(selectUserSignedIn);
  const router = useRouter();
  const lecture = forceType<Lecture>(post.lecture);
  const [updateStory] = useAgoraStorysUpdateMutation();
  const handleUpdateAgoraPost = async (
    title: string,
    jsonContent: JSONContent
  ) => {
    const result = await updateStory({
      id: post.pk!!,
      storyRequest: {
        lecture: forceType<string>(lecture.pk),
        title,
        content: JSON.stringify(jsonContent),
      },
    });
    if ("error" in result) {
      toast.error("게시글 수정 실패");
      return;
    }
    toast.success("게시글 수정 완료");
    await router.push(`/agora/${lecture.pk}/${post.pk}`);
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
