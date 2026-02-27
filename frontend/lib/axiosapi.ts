
import axios from "axios";
import endpoints from "./apiEndpoints";

/**
 * 実行環境に応じたベースURLを取得
 * - クライアント: 同一オリジンの相対URL
 * - サーバー: 環境変数から取得
 */
const getBaseURL = () => {
  if (typeof window !== "undefined") {
    return `${window.location.protocol}//${window.location.host}/api/`;
  }
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost/api/";
};

/**
 * CookieからCSRFトークンを取得
 */
const getCsrfToken = (): string => {
  if (typeof document === "undefined") return "";
  
  const match = document.cookie.match(/csrftoken=([^;]+)/);
  return match ? match[1] : "";
};

// Axiosインスタンス作成
const api = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
});

export const refreshApi = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
});

/**
 * リクエストインターセプター: CSRFトークンを自動付与
 */
api.interceptors.request.use((config) => {
  const csrfToken = getCsrfToken();
  if (csrfToken) {
    config.headers["X-CSRFToken"] = csrfToken;
  }
  return config;
});

api.interceptors.response.use(
  res => res,
  async error => {

    // ログインページ,homeではリフレッシュ処理を行わない
    if (window.location.pathname === "/login" || window.location.pathname === "/") {
      return Promise.reject(error);
    }

    const original = error.config;

    // refresh API 自身は無視
    if (original.url?.includes(endpoints.auth.refresh())) {
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 &&
      !original._retry
    ) {
      original._retry = true;

      try {
        await refreshApi.post(endpoints.auth.refresh());
        return api(original);
      } catch {
        // refresh token 無い or 期限切れ
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);
export default api;