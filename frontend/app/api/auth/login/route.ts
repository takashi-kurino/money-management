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

  Res.headers.getSetCookie().forEach((cookie) => {
  // sessionid が含まれて「いない」場合だけ、レスポンスに追加する
    if (!cookie.includes("sessionid=")) {
      response.headers.append("Set-Cookie", cookie);
    } 
  });
    
  return response
}