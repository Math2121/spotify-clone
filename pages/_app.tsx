import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/dist/shared/lib/router/router";
import { RecoilRoot } from "recoil";
import "../styles/global.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  );
}

export default MyApp;
