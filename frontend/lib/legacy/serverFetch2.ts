// Server-only fetch (RSC / SSR / Server Actions)

const INTERNAL_BASE =
  process.env.INTERNAL_API_BASE ?? "http://django-web:8000/api";

function normalizePath(path: string) {
  if (path.startsWith("http")) return path;
  return `${INTERNAL_BASE}${path.startsWith("/") ? path : `/${path}`}`;
}

export async function serverFetch(
  path: string,
  options: RequestInit = {}
) {
  const url = normalizePath(path);

  return fetch(url, {
    ...options,
    cache: "no-store",
    credentials: "include", // ← Cookie 自動送信
  });
}
