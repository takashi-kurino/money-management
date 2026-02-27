'use client';

import Link from 'next/link';
import { useLogin } from '@/app/(auth)/hooks/useLogin';
import { useState } from 'react';

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card, CardContent, CardDescription,
  CardHeader, CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Props = React.ComponentProps<"div">;

export function LoginForm({ className, ...props }: Props) {   

  const { login, error, loading } = useLogin();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>ログイン</CardTitle>
          <CardDescription>ユーザー名とパスワードを入力してください</CardDescription>
        </CardHeader>

        <CardContent>
          <form
            className="space-y-6"
            onSubmit={(e) => login(e, form)}
          >
            <div className="flex flex-col gap-6">
              
              {/* USERNAME */}
              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="username"
                  onChange={onChange}
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
                  onChange={onChange}
                  required
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}

              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "ログイン中…" : "ログイン"}
                </Button>
                {/* <Button variant="outline" className="w-full">
                  Login with Google
                </Button> */}
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
