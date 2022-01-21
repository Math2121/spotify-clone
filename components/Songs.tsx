import { ReactNode } from "react";
import { useRecoilValue } from "recoil";
import { playListState } from "../atoms/playlistAtom";
import Song from "./Song";

function Songs() {
  const palylist = useRecoilValue(playListState);
 
  return (
    <>
      <div className="text-white">
        {palylist?.tracks.items.map((track,i) => (
          <Song key={track.track.id} track={track} order={i} />
        ))}
      </div>
    </>
  );
}

export default Songs;
