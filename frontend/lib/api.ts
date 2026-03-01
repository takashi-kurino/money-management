// lib/api.ts
import { cookies } from "next/headers"

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
  if (!res.ok) throw new Error(`API error: ${res.status}`)

  return res.json()
}