'use client';

import { Button } from "@/_components/ui/button"
import {
  Card, CardContent, CardDescription,
  CardHeader, CardTitle,
} from "@/_components/ui/card"

import { Input } from "@/_components/ui/input"
import { Label } from "@/_components/ui/label"

import {useActionState} from "react"
import {PasswordReset} from "@/app/(auth)/clientactions"

type ResetError={
    email?:string[]
}

const initialState={
  data:null,
  success:false,
}

export function PasswordResetForm() {   
  const [state, formAction, pending] = useActionState(PasswordReset, initialState)
  
  const error = state?.data as ResetError | null
  const success = state?.success
  
  return (
    <div >
      <Card>
        <CardHeader>
          <CardTitle>パスワードリセット</CardTitle>
          {success ? null :  <CardDescription>メールアドレスを入力してください。</CardDescription>}
         
        </CardHeader>

        <CardContent>
            {success ?
                <p className="text-green-500" aria-live="polite">
                    パスワードリセットのメールを送信しました。
                </p>
            :
               
            
            <form action={formAction} className="space-y-6">
                <div className="flex flex-col gap-6">
                
                {/* Email */}
                <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                    id="email"
                    name="email"
                    type="text"
                    suppressHydrationWarning

                    />
                </div>
                    {error?.email && (
                    <p className="text-red-500" aria-live="polite">
                        {error.email?.map((msg, index) => (
                        <span key={index}>{msg}</span>
                        ))}
                    </p>
                    )}
                </div>

                <div className="flex flex-col gap-3">
                    <Button disabled={pending} type="submit" className="w-full">
                      {pending?"パスワードをリセット":"パスワードをリセット中..."}
                    </Button>
                </div>

            </form>
          }
        </CardContent>
      </Card>
    </div>
  );
}
