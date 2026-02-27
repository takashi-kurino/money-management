// Shared fetch helpers for server-side and client-side usage
// - serverFetch: for Next.js server-side (RSC/SSR) to call internal services
// - clientBaseUrl: runtime-determined base for browser requests (if needed)

export const INTERNAL_BASE = process.env.NEXT_PUBLIC_INTERNAL_API_BASE || "http://django-web:8000/api/";
console.log("INTERNAL_BASE:", INTERNAL_BASE);

function normalizePath(path: string) {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  console.log("aaaaNormalized path:", `${INTERNAL_BASE}${path.startsWith("/") ? path : `${path}`}`);
  return `${INTERNAL_BASE}${path.startsWith("/") ? path : `${path}`}`;
}

export async function serverFetch(path: string, options: RequestInit = {}) {
  const url = normalizePath(path);
  const headers = new Headers(options.headers as HeadersInit || {});
  // ★ 追加：SSR で fetch している URL のログ
  console.log("SSR fetch URL:", url);
  console.log("SSR fetch headers:", Object.fromEntries(headers.entries()));

  const res = await fetch(url, {
    ...options,
    headers,
    cache: (options as any).cache ?? "no-store",
  });

  return res;
}

// Accept either an endpoint function (from apiEndpoints) or a path string.
export async function serverFetchEndpoint(endpoint: string | (() => string), options: RequestInit = {}) {
  const path = typeof endpoint === 'function' ? `/${endpoint()}` : endpoint;
  
  return serverFetch(path, options);
}

export function clientBaseUrl() {
  return `${window.location.origin}`;
}

export default {
  serverFetch,
  clientBaseUrl,
};

