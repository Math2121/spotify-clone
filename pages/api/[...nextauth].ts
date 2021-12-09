import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import { LOGIN_URL } from "../../services/spotify"
interface ISpotify{
  clientId: string
  clientSecret:string
  authorization:string
}
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization:LOGIN_URL  
    } as ISpotify),
    // ...add more providers here
  ],
  secret:process.env.JWT_SECRET
})