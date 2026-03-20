// lib/api.ts
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function fetchWithAuth(path: string, init?: RequestInit) {
  const cookieStore = await cookies()
  const cookieHeader = cookieStore.toString() // 全Cookie文字列を取得

  const res = await fetch(`${process.env.DJANGO_API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader, // ← ブラウザのCookieをDjangoに転送
      "X-CSRFToken": cookieStore.get("csrftoken")?.value || "", // CSRFトークンもヘッダーに追加
      ...init?.headers,
    },
    cache: "no-store", // 認証済みデータはキャッシュしない
  })
  // 未認証・権限なし → ログイン画面へリダイレクト
  if (res.status === 401 || res.status === 403) {
    redirect("/login")
  }
  
  if (!res.ok) throw new Error(`API error: ${res.status}`)

  return res.json()
}