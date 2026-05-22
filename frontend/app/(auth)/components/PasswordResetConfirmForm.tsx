'use client';

import { Button } from "@/_components/ui/button"
import {
  Card, CardContent, CardDescription,
  CardHeader, CardTitle,
} from "@/_components/ui/card"

import { Input } from "@/_components/ui/input"
import { Label } from "@/_components/ui/label"

import {useActionState} from "react"
import {PasswordResetConfirm} from "@/app/(auth)/clientactions"
import { useSearchParams } from "next/navigation"   
import Link from 'next/link';

type ResetError={
    new_password1?:string[]
    new_password2?:string[]
    uid?:string[]
    token?:string[]
}

const initialState={
  data:null,
  success:false,
}

export function PasswordResetConfirmForm() {   
    const [state, formAction, pending] = useActionState(PasswordResetConfirm, initialState)

    const searchParams = useSearchParams()
    const uid = searchParams.get("uid") || ""
    const token = searchParams.get("token") || ""
    const error = state?.data as ResetError | null
    const success = state?.success
    
    return (
        <div >
        <Card>
            <CardHeader>
            <CardTitle>パスワードリセット</CardTitle>
            {success ? null :  <CardDescription>新しいパスワードを入力してください。</CardDescription>}
            
            </CardHeader>

            <CardContent>
                {success ?
                    <>

                        <p className="text-green-500" aria-live="polite">
                            パスワードの変更完了しました。新しいパスワードでログインしてください。
                        </p>

                        <Link href="/login" className="text-blue-500 underline">
                            ログインページへ
                        </Link>
                    </>
                :
                <form action={formAction} className="space-y-6">
                    <div className="flex flex-col gap-6">
                    
                        {/* password */}
                        <div className="grid gap-3">
                            <Label htmlFor="new_password1">新しいパスワード</Label>
                            <Input
                            id="new_password1"
                            name="new_password1"
                            type="password"
                            // suppressHydrationWarning
                            required

                            />

                            {error?.new_password1 && (
                            <p className="text-red-500" aria-live="polite">
                                {error.new_password1?.map((msg, index) => (
                                <span key={index}>{msg}</span>
                                ))}
                            </p>
                            )}
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="new_password2">新しいパスワード確認用</Label>
                            <Input
                            id="new_password2"
                            name="new_password2"
                            type="password"
                            // suppressHydrationWarning
                            required

                            />

                            {error?.new_password2 && (
                            <p className="text-red-500" aria-live="polite">
                                {error.new_password2?.map((msg, index) => (
                                <span key={index}>{msg}</span>
                                ))}
                            </p>
                            )}
                        </div>
                        {/* uidとtokenはhiddenで送る hiddenは非表示。 */}
                        <input
                            id="uid"
                            name="uid"
                            type="hidden"
                            value={uid}
                        />

                        <input
                            id="token"
                            name="token"
                            type="hidden"
                            value={token}
                        />
                        {error?.uid && (
                            <p className="text-red-500" aria-live="polite">
                                {error.uid?.map((msg, index) => (
                                <span key={index}>{msg}</span>
                                ))}
                            </p>
                        )}
                        {error?.token && (
                            <p className="text-red-500" aria-live="polite">
                                {error.token?.map((msg, index) => (
                                <span key={index}>{msg}</span>
                                ))}
                            </p>
                        )}

                        <div className="flex flex-col gap-3">
                            <Button disabled={pending} type="submit" className="w-full">
                                {pending?"パスワードをリセット中...":"パスワードをリセット"}
                            </Button>
                        </div>
                </div>

                </form>
            }
            </CardContent>
        </Card>
        </div>
      );
}
