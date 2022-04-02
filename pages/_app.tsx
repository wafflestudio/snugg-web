import "../styles/globals.css";
import type { AppProps } from "next/app";
import DefaultLayoutComponent from "../components/Layout/DefaultLayoutComponent";
import OnlyHeaderLayoutComponent from "../components/Layout/OnlyHeaderLayoutComponent";
import { wrapper } from "../store";

import LectureExploreLayout from "../components/Layout/LectureExploreLayout";

import { theme } from "../utility";
import { ThemeProvider } from "@mui/system";

function MyApp({ Component, pageProps }: AppProps) {
  switch (Component.displayName) {
    case "ProfileComponent":
    case "TagsPageComponent":
      return (
        <OnlyHeaderLayoutComponent>
          <Component {...pageProps} />
        </OnlyHeaderLayoutComponent>
      );
    case "AgoraSearchPage":
      return (
        <LectureExploreLayout>
          <Component {...pageProps} />
        </LectureExploreLayout>
      );

    case "QuestionPage":
    case "UnAuthPage":
      return (
        <ThemeProvider theme={theme}>
          <OnlyHeaderLayoutComponent>
            <Component {...pageProps} />
          </OnlyHeaderLayoutComponent>
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
