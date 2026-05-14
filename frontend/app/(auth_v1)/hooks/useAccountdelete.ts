'use client';

import { useRouter } from 'next/navigation';
import { deleteAccount } from '@/app/(auth_v1)/user_v1/endpoints';
import { useState } from 'react';
import axios from 'axios';

export const useAccountDelete = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const deleteaccount = async (e: React.FormEvent, password: string) => {
    e.preventDefault();
    setError(null);

    try {
      await deleteAccount(password);
      router.push('/');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const data = err.response?.data as { password?: string; detail?: string };
        console.error('削除中にエラーが発生', data);
        setError(data?.password ?? data?.detail ?? '削除に失敗しました');
      } else {
        console.error('予期せぬエラー', err);
        setError('サーバーエラーが発生しました');
      }
    }
  };

  return { deleteaccount, error };
};
