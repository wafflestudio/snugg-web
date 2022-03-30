import "../styles/globals.css";
import type { AppProps } from "next/app";
import DefaultLayoutComponent from "../components/Layout/DefaultLayoutComponent";
import OnlyHeaderLayoutComponent from "../components/Layout/OnlyHeaderLayoutComponent";
import { wrapper } from "../store";
import LectureExploreLayout from "../components/Layout/LectureExploreLayout";

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
      return (
        <OnlyHeaderLayoutComponent>
          <Component {...pageProps} />
        </OnlyHeaderLayoutComponent>
      );
    case "SignInPage":
    case "SignUpPage":
      return <Component {...pageProps} />;
    default:
      return (
        <DefaultLayoutComponent>
          <Component {...pageProps} />
        </DefaultLayoutComponent>
      );
  }
}

export default wrapper.withRedux(MyApp);
