import '../styles/globals.css'
import type { AppProps } from 'next/app'
import DefaultLayout from "../components/Layout/DefaultLayout";
import OnlyHeaderLayout from "../components/Layout/OnlyHeaderLayout";

function MyApp({ Component, pageProps }: AppProps) {
    switch (Component.displayName) {
        case "Profile":
            return (
                <OnlyHeaderLayout>
                    <Component {...pageProps} />
                </OnlyHeaderLayout>
            )
        default:
            return (
                <DefaultLayout>
                    <Component {...pageProps} />
                </DefaultLayout>
            )
    }




}

export default MyApp
