import "../styles/globals.css";
import type { AppProps } from "next/app";
import DefaultLayoutComponent from "../components/reused/Layout/DefaultLayoutComponent";
import OnlyHeaderLayout from "../components/reused/Layout/OnlyHeaderLayout";
import { wrapper } from "../store";

import LectureExploreLayout from "../components/reused/Layout/LectureExploreLayout";

import { theme } from "../utility";
import { ThemeProvider } from "@mui/system";

function MyApp({ Component, pageProps }: AppProps) {
  switch (Component.displayName) {
    case "ProfileComponent":
    case "TagsPageComponent":
      return (
        <OnlyHeaderLayout>
          <Component {...pageProps} />
        </OnlyHeaderLayout>
      );
    case "AgoraSearchPage":
      return (
        <LectureExploreLayout>
          <Component {...pageProps} />
        </LectureExploreLayout>
      );

    case "QuestionPage":
    case "QuestionEditPage":
    case "UnAuthPage":
      return (
        <ThemeProvider theme={theme}>
          <OnlyHeaderLayout>
            <Component {...pageProps} />
          </OnlyHeaderLayout>
        </ThemeProvider>
      );
    case "SignInPage":
    case "SignUpPage":
      return (
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      );
    default:
      return (
        <ThemeProvider theme={theme}>
          <DefaultLayoutComponent>
            <Component {...pageProps} />
          </DefaultLayoutComponent>
        </ThemeProvider>
      );
  }
}

export default wrapper.withRedux(MyApp);
