'use client';

import { Button } from "@/_components/ui/button"
import {
  Card, CardContent, CardDescription,
  CardHeader, CardTitle,
} from "@/_components/ui/card"

import { Input } from "@/_components/ui/input"
import { Label } from "@/_components/ui/label"

import {useActionState} from "react"
import {PasswordChange} from "@/app/(auth)/clientactions"

type ResetError={
    new_password1?:string[]
    new_password2?:string[]
}

const initialState={
  data:null,
  success:false,
}

export function PasswordChangeForm() {   
  const [state, formAction, pending] = useActionState(PasswordChange, initialState)
  
  const error = state?.data as ResetError | null
  const success = state?.success
  
  return (
    <div >
      <Card>
        <CardHeader>
          <CardTitle>パスワード変更</CardTitle>
          {success ? null :  <CardDescription>新しいパスワードを入力してください。</CardDescription>}
        </CardHeader>

        <CardContent>
            {success ?
                <p className="text-green-500" aria-live="polite">
                    パスワード変更しました。
                </p>
            :
            <form action={formAction} className="space-y-6">
                <div className="flex flex-col gap-6">
                
                    {/* New Password */}
                    <div className="grid gap-3">
                        <Label htmlFor="new_password1">新しいPassword</Label>
                        <Input
                        id="new_password1"
                        name="new_password1"
                        type="password"
                        suppressHydrationWarning

                        />
                    </div>
                        {error?.new_password1 && (
                        <p className="text-red-500" aria-live="polite">
                            {error.new_password1?.map((msg, index) => (
                            <span key={index}>{msg}</span>
                            ))}
                        </p>
                        )}

                    {/* New Password Confirmation */}
                    <div className="grid gap-3">
                        <Label htmlFor="new_password2">新しいPassword確認用</Label>
                        <Input
                        id="new_password2"
                        name="new_password2"
                        type="password"
                        suppressHydrationWarning

                        />
                    </div>
                        {error?.new_password2 && (
                        <p className="text-red-500" aria-live="polite">
                            {error.new_password2?.map((msg, index) => (
                            <span key={index}>{msg}</span>
                            ))}
                        </p>
                        )}
                </div>
                

                <div className="flex flex-col gap-3">
                    <Button disabled={pending} type="submit" className="w-full">
                      {pending?"パスワードを変更中...":"パスワードを変更"}
                    </Button>
                </div>

            </form>
          }
        </CardContent>
      </Card>
    </div>
  );
}
