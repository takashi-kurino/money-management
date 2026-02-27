// frontend/components/auth/registration-verify-email.tsx

"use client"

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { useRegistrationVerifyEmail } from '@/app/(auth)/hooks/useRegistrationVerifyEmail'
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

export function VerifyEmail() {
  const { handleRegistrationVerifyEmail, error, loading, success } =  useRegistrationVerifyEmail();
  
  const searchParams = useSearchParams();
  let verify_key = searchParams.get("key") || "";
  console.log("Verifying email with key:", verify_key);
  useEffect(() => {
    if (verify_key) {
      
      handleRegistrationVerifyEmail(verify_key); // key を渡す
    }
  }, [verify_key]);
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle>メールアドレス確認</CardTitle>
            <CardDescription>
              {loading && "認証中です…"}
              {success && "メールアドレスを認証しました。ログイン画面へ進んでください。"}
              {error && "認証に失敗しました。リンクが無効です。"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {success && (
              <div className="flex flex-col gap-6">
                <Button variant="link" asChild className="w-full">
                  <Link href="/login">ログイン画面へ</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
