
// proxy.ts (Next.js v16 の middleware 相当)
import { NextRequest, NextResponse } from "next/server";

function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    // 10秒の余裕を持たせる
    return payload.exp * 1000 < Date.now() + 10_000;
  } catch {
    return true;
  }
}

export async function proxy(req: NextRequest) {

  const accessToken = req.cookies.get("access")?.value;
  const refreshToken = req.cookies.get("refresh")?.value;

  // 保護対象外のパスはスルー
  const isPublicPath =
    req.nextUrl.pathname === "/" ||
    req.nextUrl.pathname.startsWith("/login") ||
    req.nextUrl.pathname.startsWith("/password-reset") ||
    req.nextUrl.pathname.startsWith("/registration") ||
    req.nextUrl.pathname.startsWith("/api/auth");

  const isAuthPath =
    req.nextUrl.pathname.startsWith("/transaction") ||
    req.nextUrl.pathname.startsWith("/category") ||
    req.nextUrl.pathname.startsWith("/settings");

  const isAuthPage = 
    req.nextUrl.pathname.startsWith("/login") || 
    req.nextUrl.pathname.startsWith("/registration") ||
    req.nextUrl.pathname.startsWith("/password-reset");
    
  // 保護対象のパスにアクセスしているがアクセストークンもリフレッシュトークンもない場合はログインへリダイレクト
  if (isAuthPath && !accessToken && !refreshToken) {
    console.log("保護されたパスにアクセスしていますが、アクセストークンもリフレッシュトークンもありません。ログインへリダイレクトします。");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // ログイン済みユーザーがログイン/登録ページにアクセスした場合は設定ページへリダイレクト
  if (accessToken && isAuthPage) {
    console.log("ログイン済みユーザーがログイン/登録ページにアクセスしています。設定ページへリダイレクトします。");
    return NextResponse.redirect(new URL("/settings", req.url));
  }

  // 保護対象外のパスはそのまま通す
  if (isPublicPath){
    console.log("保護対象外のパスにアクセスしています。リクエストをそのまま通します。");
    return NextResponse.next();
  } 

  // アクセストークンが切れていてリフレッシュトークンがある場合
  if ((!accessToken || isTokenExpired(accessToken)) && refreshToken) {
    console.log("アクセストークンが切れているか存在しませんが、リフレッシュトークンがあります。リフレッシュを試みます。");  

    const refreshRes = await fetch(`${req.nextUrl.origin}/api/auth/refresh/`, {
      method: "POST",
      headers: { cookie: req.headers.get("cookie") ?? ""},
    });

    console.log("リフレッシュレスポンス", refreshRes)
    
    if (!refreshRes.ok) {
      // リフレッシュ失敗 → ログインへリダイレクト
      return NextResponse.redirect(new URL("/login", req.url));
    }
    
    // 新しい Set-Cookie をそのまま次のレスポンスに引き渡す
    const res = NextResponse.next();
    refreshRes.headers.getSetCookie().forEach((cookie) => {
      res.headers.append("Set-Cookie", cookie);
    });
    return res;
  }

  // アクセストークンもリフレッシュトークンもない
  if (!accessToken && !refreshToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};