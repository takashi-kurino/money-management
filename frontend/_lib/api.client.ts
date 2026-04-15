// lib/api.client.ts

export async function clientFetch(path: string, init?: RequestInit) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    ...init,
    credentials: "include", // ← これだけでCookieが送られる
  });
  return res;
}