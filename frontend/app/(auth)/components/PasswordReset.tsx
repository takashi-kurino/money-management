'use client';

import { useState } from 'react';
import { usePasswordReset } from '@/app/(auth)/hooks/usePasswordreset';

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function PasswordResetForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

    const {handlePasswordReset, error, loading,success} = usePasswordReset();
    const [email, setEmail] = useState('');

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
            <CardHeader>
            <CardTitle>パスワードリセット</CardTitle>
            {!success && (
            <CardDescription>
                メールアドレスを入力してください。
            </CardDescription>
            )}
            
            </CardHeader>
            <CardContent>
            <form
                method="POST"
                className="space-y-6"
                onSubmit={(e) => handlePasswordReset(e, email)}
                >
                <div className="flex flex-col gap-6">
                    {/* 成功前だけ表示 */}
                    {!success && (
                    <>
                        <div className="grid gap-3">
                        <Label htmlFor="user">Email</Label>
                        <Input
                            id="user"
                            type="email"
                            placeholder=""
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        </div>

                        <div className="flex flex-col gap-3">
                            <Button type="submit" className="w-full">
                                送信
                            </Button>
                        </div>
                    </>
                    )}

                    {/* エラー表示は常に */}
                    {error && (
                    <p className="text-red-500 ml-auto inline-block text-sm underline-offset-4 hover:underline">
                        {error}
                    </p>
                    )}

                    {/* 成功メッセージ */}
                    {success && (
                        <p className="text-green-500 ml-auto inline-block text-sm underline-offset-4 hover:underline">
                            パスワード再設定メールを送信しました
                        </p>
                    )}
                    

                </div>
            </form>

            </CardContent>
        </Card>
        </div>
    )
}
