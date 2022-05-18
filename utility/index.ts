import { KeyboardEventHandler } from "react";
import { createTheme } from "@mui/material/styles";

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
