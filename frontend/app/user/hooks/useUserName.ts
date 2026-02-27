"use client";

// hooks/useUserInfo.ts
import { useEffect, useState } from 'react';
import { UserInfo } from '../endpoints';

export const useUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    const loadUser = async () => {
      try {
        const data = await UserInfo();
        setUser(data);
      } catch (e: any) {
        setUser(null);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  return { user, loading, error };
};
