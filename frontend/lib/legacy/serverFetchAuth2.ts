// 401 → refresh → retry 専用
import { serverFetch } from "./serverFetch";

export async function serverFetchWithAuth(
  path: string,
  options: RequestInit = {}
) {
  const res = await serverFetch(path, options);
  if (res.status !== 401) return res;

  // refresh（Cookieは自動で送られる）
  const refreshRes = await serverFetch("auth/token/refresh/", {
    method: "POST",
  });

  if (!refreshRes.ok) return res;

  // retry
  return serverFetch(path, options);
}
