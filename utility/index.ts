import { KeyboardEventHandler } from "react";
import { createTheme } from "@mui/material/styles";
import { JSONContent } from "@tiptap/react";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { PostRequest } from "../store/api/injected";
import { IMAGE_ENDPOINT } from "../api";
import {
  PresignedPost,
  useMediaPresignedCreateMutation,
} from "../store/api/enhanced";

export const queryToString = (query: undefined | string | string[]) =>
  Array.isArray(query) ? query[0] : query ?? null;

export const onEnterDo =
  (callback: KeyboardEventHandler): KeyboardEventHandler =>
  (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      callback(e);
    }
  };

export const theme = createTheme({
  typography: {
    fontFamily: "NanumGothic, sans-serif",
  },
});

export const dummyLectures = () => {
  const lectureInfo = {
    courseName: "대학영어",
    professor: "홍길동",
    credits: 3,
    courseCode: "L0441.000600 / 007",
    studentNumber: 22,
    grade: 3,
    dept: "영어영문학과",
    key: 1,
  };
  const lectureInfos = [];
  for (let i = 0; i < 10; i++) {
    lectureInfos.push({ ...lectureInfo, key: i });
  }
  return lectureInfos;
};

export const nanToNull = (x: number) => (isNaN(x) ? null : x);

interface ImageReplaceResult {
  blobs: { blob: Blob; key: string }[];
  newContent: JSONContent;
}

export const getFileNames = (jsonContent: JSONContent): string[] => {
  if (jsonContent.type === "image") {
    const filename = jsonContent.attrs!!.alt;
    return [filename];
  } else {
    return jsonContent.content?.flatMap((value) => getFileNames(value)) ?? [];
  }
};
/*
 replace all the `src` attribute of image tags that are data-urls
 and return list of new blobs generated from data-urls with new jsonContent
*/
export const replaceImgSrc = async (
  url: string,
  key: string,
  jsonContent: JSONContent
): Promise<ImageReplaceResult> => {
  if (jsonContent.type === "image") {
    const dataUrl: string = jsonContent.attrs?.src;
    if (!dataUrl.startsWith("data:"))
      return { blobs: [], newContent: jsonContent };
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    const filename: string = jsonContent.attrs?.alt;
    return {
      blobs: [
        {
          blob,
          key: key + filename,
        },
      ],
      newContent: {
        ...jsonContent,
        attrs: {
          ...jsonContent.attrs,
          src: url + key + filename,
        },
      },
    };
  } else {
    if (jsonContent.content === undefined)
      return { blobs: [], newContent: jsonContent };
    const replaceResults = await Promise.all(
      jsonContent.content.map((e) => replaceImgSrc(url, key, e))
    );
    return {
      blobs: replaceResults.flatMap(({ blobs }) => blobs),
      newContent: {
        ...jsonContent,
        content: replaceResults.flatMap(({ newContent }) => newContent),
      },
    };
  }
};
export const errorToString = (e: SerializedError | FetchBaseQueryError) => {
  const status = "status";
  if (!(status in e)) {
    return e.message;
  } else {
    return JSON.stringify(e.data);
  }
};
export const forceType = <T>(x: any) => x as T;
export const uploadImage = async (pres: PresignedPost, blob: Blob) => {
  const body = new FormData();
  body.append("key", pres.fields.key);
  body.append("file", blob);
  for (const k in pres.fields) {
    if (k !== "key") body.append(k, pres.fields[k]);
  }
  const result = await fetch(pres.url, { body, method: "POST" });
  const ok = result.ok;
  const message = ok
    ? null
    : await result
        .text()
        .then((text) => new DOMParser().parseFromString(text, "text/xml"))
        .then((xml) => xml.getElementsByTagName("Message")[0].textContent)
        .catch(() => null);
  return {
    ok,
    message,
  };
};
export const useUploadPost = () => {
  const [createPresigned] = useMediaPresignedCreateMutation();
  return async <T extends any>(
    field: string,
    title: string,
    jsonContent: JSONContent,
    tags: string[],
    upload: (arg: PostRequest) => Promise<T>
  ) => {
    const filenames = getFileNames(jsonContent);
    if (filenames.length !== 0) {
      const presResult = await createPresigned({
        directoryRequest: {
          filenames,
        },
      });
      if ("error" in presResult) {
        return {
          presError: presResult.error,
        };
      }
      const { newContent, blobs } = await replaceImgSrc(
        IMAGE_ENDPOINT,
        presResult.data.path,
        jsonContent
      ); // TODO: replace file name
      const imageResults = await Promise.all(
        blobs.map(({ blob }, i) =>
          uploadImage(presResult.data.presigned_posts[i], blob)
        )
      );
      const notOk = imageResults.find((e) => !e.ok);
      if (notOk) {
        return {
          imageError: notOk.message,
        };
      }
      return {
        uploadResult: await upload({
          field,
          tags: forceType<string>(tags),
          title,
          content: JSON.stringify(newContent),
        }),
      };
    } else {
      return {
        uploadResult: await upload({
          field,
          tags: forceType<string>(tags),
          title,
          content: JSON.stringify(jsonContent),
        }),
      };
    }
  };
};
