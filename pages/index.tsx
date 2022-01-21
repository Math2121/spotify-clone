import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Main from "../components/Main";
import Player from "../components/Player";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <>
      <Head>
        <title>Spotify Clone</title>
      </Head>

      <main className="bg-black h-screen overflow-hidden">
        <div className="flex">
          <Sidebar />
          <Main />
        </div>
        <div className="sticky bottom-0">
          <Player />
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
};
