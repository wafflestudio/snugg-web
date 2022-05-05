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
