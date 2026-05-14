// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  
  const body = await req.json()
  const Res = await fetch(`${process.env.DJANGO_INTERNAL_URL}/api/auth/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

  const data = await Res.json()

  if (!Res.ok) {
    return NextResponse.json(data, { status: Res.status })
  }

  // DRF から来た Set-Cookie をそのまま転送、または自前でセット
  const response = NextResponse.json({ ok: true })
    response.cookies.set("access", data.access, {
      httpOnly: true,
      maxAge: 60*5, // 1分間
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    })
    response.cookies.set("refresh", data.refresh, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 7日間
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    })
  return response
}