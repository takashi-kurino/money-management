"use client";

import { useState } from 'react';
import { loginUser } from '@/app/(auth)/endpoints';

type LoginFormValues = {
  username: string;
  password: string;
};

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (e: React.FormEvent, form: LoginFormValues) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await loginUser(form.username, form.password);
      console.log("Login response:", response);
      console.log("Cookies after login:", document.cookie);
      window.location.href = '/';
    } catch (err: any) {
      console.log("Login error response headers:", err.response?.headers);
      console.log("Login error response:", err.response?.data);
      console.log("Cookies after failed login:", document.cookie);
      if (err.response?.data?.non_field_errors) {
        setError("ユーザネームまたはパスワードが違います");
      } else {
        setError("ログインに失敗しました");
      }
    } finally {
      setLoading(false);
    }
  };

  return { login, error, loading };
};
