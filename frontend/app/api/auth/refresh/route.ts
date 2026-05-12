import { NextResponse,NextRequest } from "next/server"
import { cookies } from "next/headers"

export async function POST(req: NextRequest) {
  const cookieStore = await cookies()
  const cookieHeader = cookieStore.toString()

  const res = await fetch(`${process.env.DJANGO_INTERNAL_URL}/api/auth/token/refresh/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
      "X-CSRFToken": cookieStore.get("csrftoken")?.value || "",
    },
    body: JSON.stringify({ refresh: cookieStore.get("refresh")?.value }),
  })

  if (!res.ok) {
    return NextResponse.json({ success: false }, { status: 401 })
  }

  const data = await res.json()
  const response = NextResponse.json({ ok: true })
  response.cookies.set("access", data.access, {
    httpOnly: true,
    maxAge: 60*60*24, // 1日間
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

  // Django から返された Set-Cookie を取得
  // const setCookieHeaders = res.headers.getSetCookie()
  // console.log("🍪 [Route Handler] Set-Cookie ヘッダー:", setCookieHeaders)

  // Set-Cookie ヘッダーをブラウザに返す
  // for (const setCookieHeader of setCookieHeaders) {
  //   response.headers.append("Set-Cookie", setCookieHeader)
  // }

  console.log("✅ [Route Handler] リフレッシュ成功、Cookie をブラウザに返却")
  return response
}
