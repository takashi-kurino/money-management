'use client';

import Link from 'next/link';

import { Button } from "@/_components/ui/button"
import {
  Card, CardContent, CardDescription,
  CardHeader, CardTitle,
} from "@/_components/ui/card"

import { Input } from "@/_components/ui/input"
import { Label } from "@/_components/ui/label"

import {useActionState,useEffect} from "react"
import {Login} from "@/app/(auth)/clientactions"

type LoginError={
  password?: string[]
  non_field_errors?:string[]
}

const initialState={
  data:null,
  redirectTo:"",
}

export function LoginForm() {   
  const [state, formAction, pending] = useActionState(Login, initialState)
  
  const error = state?.data as LoginError | null

  useEffect(() => {
    if (state?.redirectTo) {
      window.location.href = state.redirectTo; // 直接リダイレクトする
      // ログイン後のユーザー名がHeaderに反映されない問題を解決するため、直接リダイレクトする。
    }
  }, [state])
  
  return (
    <div >
      <Card>
        <CardHeader>
          <CardTitle>ログイン</CardTitle>
          <CardDescription>ユーザー名とパスワードを入力してください</CardDescription>
        </CardHeader>

        <CardContent>
          <form action={formAction} className="space-y-6">
            <div className="flex flex-col gap-6">
              
              {/* USERNAME */}
              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  required
                />
              </div>

              {/* PASSWORD */}
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/password-reset"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    パスワード忘れましたか？
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                />
                {error?.password && (
                  <p className="text-red-500" aria-live="polite">
                    {error.password?.map((msg, index) => (
                      <span key={index}>{msg}</span>
                    ))}
                  </p>
                )}
              </div>
                {error?.non_field_errors && (
                  <p className="text-red-500" aria-live="polite">
                    {error.non_field_errors?.map((msg, index) => (
                      <span key={index}>{msg}</span>
                    ))}
                  </p>
                )}

              <div className="flex flex-col gap-3">
                <Button disabled={pending} type="submit" className="w-full">
                  ログイン
                </Button>
              </div>
            </div>

            <div className="mt-4 text-center text-sm">
              アカウント作成は{" "}
              <Link href="/registration" className="underline underline-offset-4">
                こちら
              </Link>
            </div>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}
