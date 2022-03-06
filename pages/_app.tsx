import "../styles/globals.css";
import type { AppProps } from "next/app";
import DefaultLayoutComponent from "../components/Layout/DefaultLayoutComponent";
import OnlyHeaderLayoutComponent from "../components/Layout/OnlyHeaderLayoutComponent";

function MyApp({ Component, pageProps }: AppProps) {
  switch (Component.displayName) {
    case "Profile":
      return (
        <OnlyHeaderLayoutComponent>
          <Component {...pageProps} />
        </OnlyHeaderLayoutComponent>
      );
    default:
      return (
        <DefaultLayoutComponent>
          <Component {...pageProps} />
        </DefaultLayoutComponent>
      );
  }
}

export default MyApp;
