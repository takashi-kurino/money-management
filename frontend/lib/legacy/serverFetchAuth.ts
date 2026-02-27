
// shared/lib/serverFetchAuth.ts
import { cookies } from "next/headers";
import { serverFetch } from "./serverfetchapi";

const INTERNAL_BASE = process.env.NEXT_PUBLIC_INTERNAL_API_BASE || "http://django-web:8000/api/";

/**
 * リフレッシュトークンで新しいアクセストークンを取得
 */
async function refreshAccessToken(): Promise<boolean> {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  const cookieHeader = allCookies.map(c => `${c.name}=${c.value}`).join("; ");

  try {
    const res = await serverFetch({INTERNAL_BASE}+"auth/token/refresh/", {
      method: "POST",
      headers: { Cookie: cookieHeader },
    });
    console.log("token",res)
    console.log("refreshAccessToken response status:", res.status);

    if (!res.ok) return false;

    const setCookieHeaders = res.headers.getSetCookie?.() || [];
    for (const setCookieHeader of setCookieHeaders) {
      const [nameValue] = setCookieHeader.split(";");
      const [name, ...valueParts] = nameValue.split("=");
      const value = valueParts.join("=");
      
      if (name && value) {
        cookieStore.set(name.trim(), value.trim(), {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
        });
      }
    }

    return true;
  } catch {
    return false;
  }
}

/**
 * 認証付きfetch（401時に自動リフレッシュ）
 */
export async function serverFetchWithAuth(path: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  
  const getCookieHeader = () => {
    const allCookies = cookieStore.getAll();
    return allCookies.map(c => `${c.name}=${c.value}`).join("; ");
  };

  const headers = new Headers(options.headers || {});
  console.log("Initial Cookie Header:", getCookieHeader());
  headers.set("Cookie", getCookieHeader());

  // 1回目のリクエスト
  let res = await serverFetch(path, { ...options, headers });
  console.log("serverFetchWithAuth response status:", res.status);
  const setCookieHeaders = res.headers.getSetCookie?.() || [];
  console.log("Set-Cookie headers:", setCookieHeaders);

  // 401エラー時にリフレッシュして再試行
  if (res.status === 401 && !path.includes("/auth/token/refresh/")) {
    const refreshed = await refreshAccessToken();
    console.log("Token refreshed:", refreshed);

    for (const setCookieHeader of setCookieHeaders) {
      const [nameValue] = setCookieHeader.split(";");
      const [name, ...valueParts] = nameValue.split("=");
      const value = valueParts.join("=");
      
      if (name && value) {
        cookieStore.set(name.trim(), value.trim(), {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
        });
      }
    }
    
    if (refreshed) {
      // 新しいクッキーで再試行
      headers.set("Cookie", getCookieHeader());
      res = await serverFetch(path, { ...options, headers });
    }
  }

  // Set-Cookieをブラウザに転送

  return res;
}

export default serverFetchWithAuth;