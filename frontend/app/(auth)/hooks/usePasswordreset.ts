
// hooks/usePasswordReset.ts

"use client";
import { useState } from 'react';
import { passwordReset } from '@/app/(auth)/endpoints';

export const usePasswordReset = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handlePasswordReset = async (e: React.FormEvent, email: string) => {
        e.preventDefault(); // フォーム送信のデフォルト動作を防ぐ
        setLoading(true);
        setError(null);
        setSuccess(false);
        
        try {
            const res= await passwordReset(email); // fetch または axios
            console.log("res=",res)
            console.log("status=",res.status);
            console.log("res=",res.data);
            
            if (res.status === 200 || res.status === 204) {
                console.log(res.data.detail);
                setSuccess(true); // ✅ 空でも成功扱い
            } else {
                setError("メール送信に失敗しました");
            }
        } catch (err: any) {
            
            if (err.response) {
            
                const data = err.response.data;
                if (data.non_field_errors) {
                    setError("メールアドレスが違います");
                } else {
                    setError("入力内容に問題があります");
                }
            } else {
                setError(err.message || "ログインに失敗しました");
            }

            throw err; // 呼び出し元でも必要なら処理できるように再スロー
        } finally {
        setLoading(false);
        }
    };

  return { handlePasswordReset, error, loading , success };
};