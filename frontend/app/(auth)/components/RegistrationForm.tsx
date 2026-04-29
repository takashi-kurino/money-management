'use client';

import { Button } from "@/_components/ui/button"
import {
  Card, CardContent, CardDescription,
  CardHeader, CardTitle,
} from "@/_components/ui/card"

import { Input } from "@/_components/ui/input"
import { Label } from "@/_components/ui/label"

import {useActionState} from "react"
import {Registration} from "@/app/(auth)/clientactions"

type RegistrationError={
  username?: string[]
  email?: string[]
  password1?: string[]
  password2?: string[]
  non_field_errors?:string[]
}
type RegistrationSuccess={
  message?: string
}

const initialState={
  data:null,
  success_flag:false
}

export function RegistrationForm() {   
  const [state, formAction, pending] = useActionState(Registration, initialState)
  const error = state?.data as RegistrationError | null
  const success = state?.data as RegistrationSuccess | null

  return (
    <div >
      <Card>
        <CardHeader>
          <CardTitle>ユーザー登録</CardTitle>
          
        {state?.success_flag==false && (
          <CardDescription>新しいアカウントを作成してください</CardDescription>
        )}
        </CardHeader>
        <CardContent>

        {state?.success_flag == true && (

            <div className="flex flex-col gap-6">
              {success?.message}
              認証メールを送信しました。メール内のリンクをクリックして、メールアドレスを認証してください。
              届かない場合は、迷惑メールフォルダも確認してください。
              
            </div>
        )}
        {state?.success_flag == false && (
          <form action={formAction} className="space-y-6">
            <div className="flex flex-col gap-6">
              
              {/* USERNAME */}
              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="username"
                  required
                />
              </div>

              {error?.username && (
                <p className="text-red-500" aria-live="polite">
                  {error.username?.map((msg, index) => (
                    <span key={index}>{msg}</span>
                  ))}
                </p>
              )}
              {/* Email */}
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                />
              </div>

              {error?.email && (
                <p className="text-red-500" aria-live="polite">
                  {error.email?.map((msg, index) => (
                    <span key={index}>{msg}</span>
                  ))}
                </p>
              )}
              
              {/* PASSWORD */}
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password1"
                  name="password1"
                  type="password1"
                  required
                />
              </div>

              {error?.password1 && (
                <p className="text-red-500" aria-live="polite">
                  {error.password1?.map((msg, index) => (
                    <span key={index}>{msg}</span>
                  ))}
                </p>
              )}
            
              {/* PASSWORD CONFIRM */}
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="passwordConfirm">Password 再確認</Label>
                </div>
                <Input
                  id="password2"
                  name="password2"
                  type="password2"
                  required
                />
              </div>
              {error?.password2 && (
                <p className="text-red-500" aria-live="polite">
                  {error.password2?.map((msg, index) => (
                    <span key={index}>{msg}</span>
                  ))}
                </p>
              )}

              {error?.non_field_errors && (
                <p className="text-red-500" aria-live="polite">
                  {error.non_field_errors?.map((msg, index) => (
                    <span key={index}>{msg}</span>
                  ))}
                </p>
              )}
              <div className="flex flex-col gap-3">
                <Button disabled={pending} type="submit" className="w-full">
                  ユーザー登録
                </Button>
              </div>

            </div>

          </form>
        )}
          
        </CardContent>
      </Card>
    </div>
  );
}
