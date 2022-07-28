import React, { FC } from "react";
import { selectUserSignedIn, useAppSelector } from "../../../../store";
import { JSONContent } from "@tiptap/react";
import { useRouter } from "next/router";
import AgoraWriteTemplate from "../../../reused/agora/AgoraWriteTemplate";
import { useAgoraStorysCreateMutation } from "../../../../store/api/injected";
import { forceType } from "../../../../utility";
import { toast } from "react-toastify";

interface Props {
  lectureId: number;
}

const AgoraWritePage: FC<Props> = ({ lectureId }) => {
  const isSignedIn = useAppSelector(selectUserSignedIn);
  const router = useRouter();
  const [createStory] = useAgoraStorysCreateMutation();
  const handleCreateAgoraPost = async (
    title: string,
    jsonContent: JSONContent
  ) => {
    const result = await createStory({
      storyRequest: {
        lecture: forceType<string>(lectureId),
        title,
        content: JSON.stringify(jsonContent),
      },
    });
    if ("error" in result) {
      toast.error("게시글 등록 실패");
      return;
    }
    toast.success("게시글 등록 완료");
    await router.push(`/agora/${lectureId}/${result.data.pk}`);
  };

  return (
    <AgoraWriteTemplate
      header={"새 게시글 작성"}
      submitLabel={"게시글 등록하기"}
      onSubmit={async (title, content) => {
        if (isSignedIn) {
          await handleCreateAgoraPost(title, content);
        } else {
          alert("로그인하세요.");
        }
      }}
    />
  );
};

export default AgoraWritePage;
