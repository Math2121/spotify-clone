import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
} from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useSpotify from "../hooks/useSpotify";

function Sidebar() {
  const { data: session, status } = useSession();
  const [playlist, SetPlayList] = useState([]);
  // hook para ter acesso as minhas informações do spotify
  const spotifyApi = useSpotify();

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getUserPlaylists()
        .then((data) => SetPlayList(data.body.items));
    }
  }, [session, spotifyApi]);


  return (
    <div className="text-gray-500 p-5 text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen">
      <div className="space-y-4">
        <button
          className="flex items-center space-x-2 hover:text-white transition duration-150"
          onClick={() => signOut()}
        >
          <HomeIcon className="h-5 w-5" />
          <p>Logout</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white transition duration-150">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>

        <button className="flex items-center space-x-2 hover:text-white transition duration-150">
          <SearchIcon className="h-5 w-5" />
          <p>Search</p>
        </button>

        <button className="flex items-center space-x-2 hover:text-white transition duration-150">
          <LibraryIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button>
        <hr className=" border-t-[0.1px] border-gray-900" />

        <button className="flex items-center space-x-2 hover:text-white transition duration-150">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create Playlist</p>
        </button>

        <button className="flex items-center space-x-2 hover:text-white transition duration-150">
          <HeartIcon className="h-5 w-5" />
          <p>Liked Songs</p>
        </button>

        <button className="flex items-center space-x-2 hover:text-white transition duration-150">
          <RssIcon className="h-5 w-5" />
          <p>Your episodes</p>
        </button>
        <hr className=" border-t-[0.1px] border-gray-900" />

        {/**Conectando a API do spotifu e buscando a playslit dele */}
        {playlist.map((play) => (
          <p key={play.id} className="cursor-pointer hover:text-white">
            {play.name}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
