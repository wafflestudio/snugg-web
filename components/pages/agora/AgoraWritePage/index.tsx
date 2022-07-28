import React, { FC } from "react";
import { selectUserSignedIn, useAppSelector } from "../../../../store";
import { JSONContent } from "@tiptap/react";
import { useRouter } from "next/router";
import AgoraWriteTemplate from "../../../reused/agora/AgoraWriteTemplate";
import { useAgoraStorysCreateMutation } from "../../../../store/api/injected";
import { errorToString, forceType, useUploadPost } from "../../../../utility";
import { toast } from "react-toastify";

interface Props {
  lectureId: number;
}

const AgoraWritePage: FC<Props> = ({ lectureId }) => {
  const isSignedIn = useAppSelector(selectUserSignedIn);
  const router = useRouter();
  const [createStory] = useAgoraStorysCreateMutation();
  const uploadPost = useUploadPost();
  const handleCreateAgoraPost = async (
    title: string,
    jsonContent: JSONContent
  ) => {
    const result = await uploadPost(jsonContent, (content) =>
      createStory({
        storyRequest: {
          lecture: forceType<string>(lectureId),
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
          "게시글을 등록할 수 없습니다: " +
            errorToString(result.uploadResult.error)
        );
      } else {
        toast.success("게시글을 등록했습니다");
        await router.push(`/agora/${lectureId}/${result.uploadResult.data.pk}`);
      }
    }
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
