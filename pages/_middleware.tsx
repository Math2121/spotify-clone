import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  //Pego o token que vem na requisição
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  const { pathname } = req.nextUrl;

  // verifico se a rota tem o token e esta vindo da auth
  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }
  // redireciono caso o token ou a rota forem inexistentes
  if (!token && pathname !== "/login") {
    return NextResponse.redirect("/login");
  }
}
