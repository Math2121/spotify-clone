import { NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";
import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest,ev:NextFetchEvent) {
  //Pego o token que vem na requisição

  const session = await getToken({
    req,
    secret: process.env.JWT_SECRET as string,
  });



  // verifico se a rota tem o token e esta vindo da auth

  if (req.url.includes("/api/auth") || session) {
    return NextResponse.next();
  }
  // redireciono caso o token ou a rota forem inexistentes
  if (!session ) {
    return NextResponse.redirect("/login");
  }
}
