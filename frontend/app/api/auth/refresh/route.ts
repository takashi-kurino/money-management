import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST() {
  const cookieStore = await cookies()
  const cookieHeader = cookieStore.toString()

  console.log("🔄 [Route Handler] リフレッシュトークン送信中...")

  const res = await fetch(`${process.env.DJANGO_API_URL}auth/token/refresh/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
      "X-CSRFToken": cookieStore.get("csrftoken")?.value || "",
    },
    cache: "no-store",
  })
  console.log("🔄 [Route Handler] リフレッシュレスポンス:", res)

  console.log("🔄 [Route Handler] リフレッシュレスポンス:", res.status)

  if (!res.ok) {
    console.log("❌ [Route Handler] リフレッシュ失敗")
    return NextResponse.json({ success: false }, { status: 401 })
  }

  // Django から返された Set-Cookie を取得
  const setCookieHeaders = res.headers.getSetCookie()
  console.log("🍪 [Route Handler] Set-Cookie ヘッダー:", setCookieHeaders)

  // レスポンスを作成
  const response = NextResponse.json({ success: true })

  // Set-Cookie ヘッダーをブラウザに返す
  for (const setCookieHeader of setCookieHeaders) {
    response.headers.append("Set-Cookie", setCookieHeader)
  }

  console.log("✅ [Route Handler] リフレッシュ成功、Cookie をブラウザに返却")
  return response
}
