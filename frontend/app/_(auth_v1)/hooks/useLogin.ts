"use client";

import { useState } from 'react';
import { loginUser } from '@/app/(auth_v1)/endpoints';

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

      window.location.href = '/';
    } catch (err: any) {
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
