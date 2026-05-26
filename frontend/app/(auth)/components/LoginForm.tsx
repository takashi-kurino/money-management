'use client';

import Link from 'next/link';

import { Button } from "@/_components/ui/button"
import {
  Card, CardContent, CardDescription,
  CardHeader, CardTitle,
} from "@/_components/ui/card"

import { Input } from "@/_components/ui/input"
import { Label } from "@/_components/ui/label"

import { Login } from "@/app/(auth)/clientactions"

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface LoginError {
  password?: string[],
  non_field_errors?: string[],  // ← sがつく
  username?: string[],
}

export default function LoginForm() {
  const router = useRouter()
  const [error, setError] = useState<LoginError | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const username = formData.get("username") as string
    const password = formData.get("password") as string

    const result = await Login(username, password)

    if (!result.ok) {
      setError(result.data)
      setIsLoading(false)  // ← エラー時だけローディング解除
      return
    }

    // 成功時：ローディングのまま遷移（フォームが一瞬クリアされるのを防ぐ）
    router.push('/transaction')
    router.refresh()
  }
  
  return (
    <div >
      <Card>
        <CardHeader>
          <CardTitle>ログイン</CardTitle>
          <CardDescription>ユーザー名とパスワードを入力してください</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col gap-6">
              
              {/* USERNAME */}
              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  suppressHydrationWarning

                />
              </div>
              {error && (
                <p className="text-red-500" aria-live="polite">
                  {error.username?.map((msg, index) => (
                    <span key={index}>{msg}</span>
                  ))}
                </p>
              )}

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
                  suppressHydrationWarning

                />
                {error && (
                  <p className="text-red-500" aria-live="polite">
                    {error.password?.map((msg, index) => (
                      <span key={index}>{msg}</span>
                    ))}
                  </p>
                )}
              </div>
                {error && (
                  <p className="text-red-500" aria-live="polite">
                    {error.non_field_errors?.map((msg, index) => (
                      <span key={index}>{msg}</span>
                    ))}
                  </p>
                )}

              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  {isLoading?"ログイン中...":"ログイン"}
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
