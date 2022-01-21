import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});
interface IUser {
  data: {
    user: {
      accessToken: string;
    };
    error: string;
  };

  status: string;
}
export default function useSpotify() {
  const { data: session, status } = useSession();
  useEffect(() => {
    // Se o refresh token não funcionar direciona para a página de login
    if (session) {
      if (session.error === "RefreshTokenError") {
        signIn();
      }

      spotifyApi.setAccessToken(session.user.accessToken);
    }
  }, [session]);
  return spotifyApi;
}
