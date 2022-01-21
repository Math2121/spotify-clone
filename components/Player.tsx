import { RewindIcon, SwitchHorizontalIcon } from "@heroicons/react/solid";
import {
  FastForwardIcon,
  HeartIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  VolumeUpIcon as VolumeDownIcon,
  VolumeUpIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackState, isPlayingState } from "../atoms/songAtom";
import useSongInfo from "../hooks/useSongInfo";
import useSpotify from "../hooks/useSpotify";
import { debounce } from "lodash";

function Player() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();

  const [currentTrackId, setCurrentTrakId] = useRecoilState(currentTrackState);

  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const [volume, setVolume] = useState(50);

  const songInfo = useSongInfo();

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        setCurrentTrakId(data.body?.item?.id);
      });

      spotifyApi.getMyCurrentPlaybackState().then((data) => {
        setIsPlaying(data.body?.is_playing);
      });
    }
  };
  function handlePlayPause() {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  }
  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackState, spotifyApi, session]);

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debounceAdjustVolume(volume);
    }
  }, [volume]);

  const debounceAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume).catch((error) => {});
    },500),
    []
  );

  return (
    <>
      <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
        <div className="flex items-center space-x-4">
          <img
            src={songInfo?.album.images?.[0].url}
            alt=""
            className="hidden md:inline h-10 w-10"
          />
          <div>
            <h3>
              {songInfo?.name}
              {songInfo?.artists?.[0]?.name}
            </h3>
          </div>
        </div>

        <div className="flex items-center justify-evenly">
          <SwitchHorizontalIcon className="button" />
          <RewindIcon className="button" />
          {isPlaying ? (
            <PauseIcon onClick={handlePlayPause} className="button w-10 h-10" />
          ) : (
            <PlayIcon onClick={handlePlayPause} className="button w-10 h-10" />
          )}

          <FastForwardIcon className="button" />
          <ReplyIcon className="button" />
        </div>
        <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
          <VolumeDownIcon
            onClick={() => volume > 0 && setVolume(volume - 10)}
            className="button"
          />

          <input
            type="range"
            value={volume}
            min={0}
            max={100}
            className="w-14 md:w-28"
            onChange={(e) => setVolume(Number(e.target.value))}
          />

          <VolumeUpIcon
            className="button"
            onClick={() => volume < 100 && setVolume(volume + 10)}
          />
        </div>
      </div>
    </>
  );
}

export default Player;
