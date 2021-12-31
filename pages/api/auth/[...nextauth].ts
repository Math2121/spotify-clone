import NextAuth, { User, Account } from "next-auth";
import { JWT } from "next-auth/jwt";
import SpotifyProvider from "next-auth/providers/spotify";
import spotifyApi, { LOGIN_URL } from "../../../services/spotify";
interface ISpotify {
  clientId: string;
  clientSecret: string;
  authorization: string;
}

// interface ICallback {
//   token: JWT | any;
//   account: Account | undefined;
//   user: User | undefined;
// }
// interface ISession {
//   session: {
//     user: {
//       username: string;
//       refreshToken: string;
//       accessToken: string;
//     };
//   };
//   token: JWT | any;
// }

async function refreshAccessToken(token: JWT | any) {
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);
    const { body: refreshdToken } = await spotifyApi.refreshAccessToken();
    console.log(`Refresh token is ${refreshdToken}`);

    return {
      ...token,
      accessToken: refreshdToken.access_token,
      accessTokenExpires: refreshdToken.expires_in + Date.now() * 1000,
      refreshToken: refreshdToken.refresh_token ?? token.refresh_token,
    };
  } catch (error) {
    console.error("OII" + error);
    return {
      ...token,
      error: "RefreshTokenError",
    };
  }
}
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET as string,
      authorization: LOGIN_URL,
    }),

  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account, user }: any) {
      //assim que o usuário logar
  
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000,
        };
      }

      // Caso o access token não tenha expirado ainda
      if (Date.now() < token.accessTokenExpires) {
     
        return token;
      }

      //O token expirou
      return await refreshAccessToken(token);
    },
    async session({ session, token }: any) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;

      return session;
    },
  },
});
