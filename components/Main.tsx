import { ChevronDownIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { shuffle } from "lodash";
import { playlistIdState, playListState } from "../atoms/playlistAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";
interface ISession {
  data: {
    user: {
      image: string;
      name: string;
    };
  };
}

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-yellow-50",
];
function Main() {
  const { data: session } = useSession() as ISession;
  const [color, setColor] = useState<string | null>("");
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playListState);
  const spotifyApi = useSpotify();

  useEffect(() => {
    setColor(shuffle(colors).pop() as string);
  }, [playlistId]);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data: any) => setPlaylist(data.body))
      .catch((error) => console.error(error));
  }, [spotifyApi, playlistId]);
  console.log(playlist);
  return (
    <div className="flex-grow relative h-screen overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 text-white">
          <img
            src={session?.user.image}
            alt=""
            className="rounded-full -w-100 h-10"
          />

          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>

      <section
        className={` flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white padding-0`}
      >
        <img
          src={playlist?.images?.[0]?.url}
          alt=""
          className="h-44 w-44 shadow-2xl"
        />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
            {playlist?.name}
          </h1>
        </div>
      </section>

      <div>
        <Songs />
      </div>
    </div>
  );
}

export default Main;
