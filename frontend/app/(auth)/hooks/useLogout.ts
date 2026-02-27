'use client';

import { logoutUser } from '@/app/(auth)/endpoints'

export const useLogout = () => {
  const logout = async () => {
    try {
      await logoutUser();
      console.log('ログアウト成功');
    } catch (err) {
      console.error('ログアウト中にエラーが発生', err);
    } finally {
      window.location.href = '/login'; // ← これで確実に反映
    }
  };

  return logout;
};
