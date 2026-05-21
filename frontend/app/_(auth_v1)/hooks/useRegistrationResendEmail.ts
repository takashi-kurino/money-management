'use client';

import { useState, useEffect } from 'react';
import { registrationResendEmail } from '@/app/(auth_v1)/endpoints';

export const useRegistrationResendEmail = (email: string) => {
  const [cooldown, setCooldown] = useState<number>(0);

  const resend = async (): Promise<void> => {
    try {
      await registrationResendEmail(email);
      setCooldown(60); // クールダウン開始
    } catch (err) {
      console.error('再送できませんでした', err);
    }
  };

  // カウントダウン処理
  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  return { resend, cooldown };
};
