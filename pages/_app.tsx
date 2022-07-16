import "../styles/globals.css";
import type { AppProps } from "next/app";
import DefaultLayoutComponent from "../components/reused/Layout/DefaultLayoutComponent";
import OnlyHeaderLayout from "../components/reused/Layout/OnlyHeaderLayout";
import { wrapper } from "../store";

import LectureExploreLayout from "../components/reused/Layout/LectureExploreLayout";

import { theme } from "../utility";
import { ThemeProvider } from "@mui/system";

import Amplify from "aws-amplify";
import awsmobile from "../aws-exports";
import { FunctionComponent } from "react";
import { ToastContainer } from "react-toastify";

Amplify.configure({ ...awsmobile, ssr: true });

const IdentityLayout: FunctionComponent = ({ children }) => <>{children}</>;

const selectLayout = (displayName?: string): FunctionComponent => {
  switch (displayName) {
    case "ProfileComponent":
    case "TagsPageComponent":
      return OnlyHeaderLayout;
    case "AgoraSearchPage":
      return LectureExploreLayout;
    case "QuestionPage":
    case "QuestionEditPage":
    case "UnAuthPage":
      return OnlyHeaderLayout;
    case "SignInPage":
    case "SignUpPage":
      return IdentityLayout;
    default:
      return DefaultLayoutComponent;
  }
};

function MyApp({ Component, pageProps }: AppProps) {
  const Layout = selectLayout(Component.displayName);
  return <ThemeProvider theme={theme}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    <ToastContainer/>
  </ThemeProvider>;
}

export default wrapper.withRedux(MyApp);
