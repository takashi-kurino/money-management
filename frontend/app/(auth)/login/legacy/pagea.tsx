// frontend/app/login2/page.tsx

import Link from 'next/link';
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card, CardContent, CardDescription,
  CardHeader, CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { login } from "@/app/(auth)/action/legacy/login";

export default function LoginPage() {

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6")}>
          <Card>
            <CardHeader>
              <CardTitle>ログイン</CardTitle>
              <CardDescription>ユーザー名とパスワードを入力してください</CardDescription>
            </CardHeader>

            <CardContent>
              <form action={login}>
                <div className="flex flex-col gap-6">
                  
                  {/* USERNAME */}
                  <div className="grid gap-3">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" name="username" type="username" required/>
                  </div>

                  {/* PASSWORD */}
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <Link href="/password-reset" className="ml-auto text-sm underline-offset-4 hover:underline">
                        パスワード忘れましたか？
                      </Link>
                    </div>
                    <Input id="password" name="password" type="password" required />
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button type="submit" className="w-full" >
                      ログイン
                    </Button>
                    <Button variant="outline" className="w-full">
                      Login with Google
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
      </div>
    </div>

  );
}
