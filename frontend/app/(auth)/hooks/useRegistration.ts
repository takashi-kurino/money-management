// hooks/useLogin.ts
"use client";
import { useState } from 'react';
import { registerUser } from '@/app/(auth)/endpoints';
import { useRouter } from 'next/navigation';

export const useRegistration = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [passworderror, setPasswordError] = useState<string | null>(null);
    const [confirmpassworderror, setConfirmpasswordError] = useState<string | null>(null);
    const [usererror, setUserError] = useState<string | null>(null);
    const [emailerror, setEmailError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const router = useRouter();
    
    const handleRegistration = async (e: React.FormEvent, username: string, email: string,password1: string,password2:string) => {
        e.preventDefault();
        setError(null);

    try {
        const data = await registerUser( username, email, password1, password2);
        setSuccess(true);
        return data;
    } catch (err: any) {
      
        if (err.response) {
            
            const data = err.response.data;
            console.log(data);
            
            if(data.email){
                data.email.forEach((msg:string) => {
                    if(msg==="This field may not be blank."){
                        setEmailError("メールアドレスを入力してください");
                    } else if(msg==="Enter a valid email address."){
                        setEmailError("有効なメールアドレスを入力してください");
                    } else if(msg==="A user is already registered with this e-mail address."){
                        setEmailError("このメールアドレスは既に登録されています");
                    } else {
                        setEmailError(msg);
                    }
                });
            }

            if(data.username){
                data.username.forEach((msg:string) => {
                    if(msg==="This field may not be blank."){
                        setUserError("ユーザー名を入力してください");
                    } else if(msg==="A user with that username already exists."){
                        setUserError("このユーザー名は既に登録されています");
                    } else {
                        setUserError(msg);
                    }
                });
            }
            if(data.password1){
                data.password1.forEach((msg:string) => {
                    if(msg==="This field may not be blank."){
                        setPasswordError("パスワードを入力してください");
                    } else if(msg==="This password is too short. It must contain at least 8 characters."){
                        setPasswordError("パスワードは8文字以上で設定してください");
                    } else if(msg==="This password is too common."){
                        setPasswordError("よく使われるパスワードは設定できません");
                    } else if(msg==="This password is entirely numeric."){
                        setPasswordError("パスワードに数字のみの設定はできません");
                    } else {
                        setPasswordError(msg);
                    }
                });
            }
            if(data.password2){
                data.password2.forEach((msg:string) => {
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

  return { handleRegistration, error,usererror,emailerror,passworderror,confirmpassworderror,loading ,success};
};
