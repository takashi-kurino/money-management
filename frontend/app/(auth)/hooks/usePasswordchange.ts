// hooks/usePasswordchange.ts
"use client";
import { useState } from 'react';
import { passwordChange } from '@/app/(auth)/endpoints';

export const usePasswordchange = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [oldpassworderror, setOldPasswordError] = useState<string | null>(null);
    const [passworderror, setPasswordError] = useState<string | null>(null);
    const [confirmpassworderror, setConfirmpasswordError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    
    const handlePasswordchange = async (e: React.FormEvent, new_password1: string, new_password2: string,old_password: string) => {
        e.preventDefault();
        setError(null);

    try {
        const data = await passwordChange( new_password1, new_password2,old_password);
        setSuccess(true);

        return data;
    } catch (err: any) {
      
        if (err.response) {
            
            const data = err.response.data;
            console.log(data);
            
            if(data.old_password){
                data.old_password.forEach((msg:string) => {
                    if(msg==="This field may not be blank."){
                        setOldPasswordError("現在のパスワードを入力してください");
                    } else if(msg==="The password is incorrect."){
                        setOldPasswordError("現在のパスワードが正しくありません");
                    } else {
                        setOldPasswordError(msg);
                    }
                });
            }

            if(data.new_password1){
                data.new_password1.forEach((msg:string) => {
                    if(msg==="This field may not be blank."){
                        setPasswordError("新しいパスワードを入力してください");
                    } else if(msg==="This password is too short. It must contain at least 8 characters."){
                        setPasswordError("新しいパスワードは8文字以上で設定してください");
                    } else if(msg==="This password is too common."){
                        setPasswordError("よく使われるパスワードは設定できません");
                    } else if(msg==="This password is entirely numeric."){
                        setPasswordError("パスワードに数字のみの設定はできません");
                    } else {
                        setPasswordError(msg);
                    }
                });
            }
            if(data.new_password2){
                data.new_password2.forEach((msg:string) => {
                    if(msg==="This field may not be blank."){
                        setConfirmpasswordError("確認用パスワードを入力してください");
                    } else if(msg==="The two password fields didn't match."){
                        setConfirmpasswordError("パスワードと確認用パスワードが一致しません");
                    } else {
                        setConfirmpasswordError(msg);
                    }
                });
            }
            if(data.non_field_errors){
                data.non_field_errors.forEach((msg:string) => {
                    setError(msg);
                });
            }
        } else {
            setError(err.message || "ログインに失敗しました");
        }

        throw err; // 呼び出し元でも必要なら処理できるように再スロー
    } finally {
        setLoading(false); // 必要ならロード状態を管理
    }
  };

  return { handlePasswordchange, error,oldpassworderror,passworderror,confirmpassworderror,loading ,success};
};
