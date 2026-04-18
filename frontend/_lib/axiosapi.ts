
import axios from "axios";
import endpoints from "./apiEndpoints";

const getBaseURL = () => {
  if (typeof window !== "undefined") {
    return `${window.location.protocol}//${window.location.host}/api/`;
  }
  return `${process.env.DJANGO_INTERNAL_URL}/api` || "http://localhost:8000/api/";

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
        if (window.location.pathname !== "/registration/verify-email") {
          alert("セッションの有効期限が切れました。再度ログインしてください。");
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);
export default api;