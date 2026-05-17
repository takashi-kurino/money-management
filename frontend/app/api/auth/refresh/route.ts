import { NextResponse,NextRequest } from "next/server"
import { cookies } from "next/headers"

export async function POST(req: NextRequest) {
  const cookieStore = await cookies()
  const token = cookieStore.get("refresh")?.value
  const body = await req.json()

  const res = await fetch(`${process.env.DJANGO_INTERNAL_URL}/api/auth/token/refresh/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    return NextResponse.json({ success: false }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })

  res.headers.getSetCookie().forEach((cookie) => {
  // sessionid が含まれて「いない」場合だけ、レスポンスに追加する
    if (!cookie.includes("sessionid=")) {
      response.headers.append("Set-Cookie", cookie);
    } 
  });

  return response
}
