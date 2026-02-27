"use client";
import { useState } from 'react';
import { verifyEmail } from '@/app/(auth)/endpoints';

export const useRegistrationVerifyEmail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleRegistrationVerifyEmail = async (key: string) => {
    setLoading(true);
    setError(null);

    try {
      const data = await verifyEmail(key);
      setSuccess(true);
      return data;
    } catch (err: any) {
      if (err.response) {
        console.log("error no 1")
        console.log("verify-email error:", err.response.data);
        setError(JSON.stringify(err.response.data) || "認証に失敗しました");
      } else {
        setError(err.message || "認証に失敗しました");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { handleRegistrationVerifyEmail, error, loading, success };
};
