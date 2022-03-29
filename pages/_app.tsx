import "../styles/globals.css";
import type { AppProps } from "next/app";
import DefaultLayoutComponent from "../components/Layout/DefaultLayoutComponent";
import OnlyHeaderLayoutComponent from "../components/Layout/OnlyHeaderLayoutComponent";
import { wrapper } from "../store";
import TagsPageLayoutComponent from "../components/Layout/TagsPageLayoutComponent";

function MyApp({ Component, pageProps }: AppProps) {
  switch (Component.displayName) {
    case "ProfileComponent":
      return (
        <OnlyHeaderLayoutComponent>
          <Component {...pageProps} />
        </OnlyHeaderLayoutComponent>
      );
    case "TagsPageComponent":
      return (
        <TagsPageLayoutComponent>
          <Component {...pageProps} />
        </TagsPageLayoutComponent>
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
