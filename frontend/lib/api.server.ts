// lib/api.server.ts

"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

async function refreshAccessToken() {
  console.log("🔄 [Server] リフレッシュ API 呼び出し...")

  // ✅ Route Handler経由（絶対URLが必要）
  const res = await fetch(`${process.env.DJANGO_API_URL}/api/auth/token/refresh`, {
    method: "POST",
    cache: "no-store",
  })

  console.log("🔄 [Server] リフレッシュレスポンス:", res.status)
  return res.ok
}

export async function fetchWithAuth(path: string, init?: RequestInit) {
  const cookieStore = await cookies()
  const cookieHeader = cookieStore.toString() // 全Cookie文字列を取得

  console.log(`${process.env.DJANGO_API_URL}${path}への再リクエストを試みます...`)

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
  console.log(`111111API response for ${path}:`, res.status)
  
  // 401エラーの場合、リフレッシュトークンを試す
  if (res.status === 401) {
    const refreshed = await refreshAccessToken()
    console.log("22222Access token refreshed:", refreshed)
    
    if (refreshed) {
      // リフレッシュ成功 → 再度リクエストを実行
      console.log(`${process.env.DJANGO_API_URL}${path}への再リクエストを試みます...`)
      const retryRes = await fetch(`${process.env.DJANGO_API_URL}${path}`, {
        ...init,
        headers: {
          "Content-Type": "application/json",
          Cookie: (await cookies()).toString(),
          "X-CSRFToken": (await cookies()).get("csrftoken")?.value || "",
          ...init?.headers,
        },
        cache: "no-store",
      })
      console.log(`22222API retry response for ${path}:`, retryRes)
      console.log(`33333API retry response for ${path}:`, retryRes.status)
      
      if (retryRes.status === 401 || retryRes.status === 403) {
        redirect("/login")
      }
      
      if (retryRes.status === 204) return "no content"
      return retryRes.json()
    }
    
    // リフレッシュ失敗 → ログイン画面へ
    redirect("/login")
  }
  
  // 403エラー → ログイン画面へ
  if (res.status === 403) {
    redirect("/login")
  }
  
  // if (!res.ok) throw new Error(`API error: ${res.status}`)

  if (res.status === 204) return "no content" // データがない場合は特別に扱う;

  return res.json()
}