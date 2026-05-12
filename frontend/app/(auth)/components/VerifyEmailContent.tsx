
"use client";

// frontend/components/auth/registration-verify-email.tsx

"use client"

import Link from 'next/link'
import { Button } from "@/_components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/_components/ui/card"

import { useSearchParams } from "next/navigation"
import { VerifyEmail } from "@/app/(auth)/clientactions"
import { useState ,useEffect} from "react";

export default function VerifyEmailContent() {

    const searchParams = useSearchParams();
    const verify_key = searchParams.get("key") || "";
    const [state, setState] = useState<string | "">("アカウントを確認しています。しばらくお待ちください。");
    const [success, setSuccess] = useState(false);
    
    useEffect(() => {
        async function verify() {

            const {data,status} = await VerifyEmail(verify_key);
            console.log("VerifyEmailのレスポンス", {data, status});

            if (status !== 200) {
                setState(data.detail || "認証に失敗しました。リンクが無効です。");
                return;
            }
            if (status === 200) {
                setState(data.detail || "認証に成功しました。ログイン画面へ進んでください。");
                setSuccess(true);
            }
        }
        if (verify_key) {
            verify();
        }
    }, [verify_key]);

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      
            <div className="w-full max-w-sm">
                <Card>
                <CardHeader>
                    <CardTitle>アカウント認証</CardTitle>
                    <CardDescription>
                        {state && (
                            <p>{state}</p>
                        )}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {success &&
                    <div className="flex flex-col gap-6">
                        <Button variant="link" asChild className="w-full">
                        <Link href="/login">ログイン画面へ</Link>
                        </Button>
                    </div>
                    }
                </CardContent>
                </Card>
            </div>
        </div>

    )
}