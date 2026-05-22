'use client';

import { Button } from "@/_components/ui/button"
import {
  Card, CardContent, CardDescription,
  CardHeader, CardTitle,
} from "@/_components/ui/card"

import { Input } from "@/_components/ui/input"
import { Label } from "@/_components/ui/label"

import {useActionState,useState,useEffect} from "react"
import {Registration, ResendEmail} from "@/app/(auth)/clientactions"

type RegistrationError={
  username?: string[]
  email: string[]
  password1?: string[]
  password2?: string[]
  non_field_errors?:string[]
}

type RegistrationSuccess={
  message?: string
}
// initialState を明示的に型付け
const initialState: {
  data: null
  success_flag: boolean
  email: string | null   // ← null は許容するが string に限定
} = {
  data: null,
  success_flag: false,
  email: null
}

const useRegistrationResendEmail = (email: string) => {
  const [cooldown, setCooldown] = useState<number>(0);

  const resend = async (): Promise<void> => {
    try {
      await ResendEmail(email);
      setCooldown(60); // クールダウン開始
    } catch (err) {
      console.error('再送できませんでした', err);
    }
  };

  // カウントダウン処理
  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  return { resend, cooldown };
};

export function RegistrationForm() {   
  const [state, formAction, pending] = useActionState(Registration, initialState)
  const error = state?.data as RegistrationError | null
  const success = state?.data as RegistrationSuccess | null
  const { resend, cooldown } = useRegistrationResendEmail(typeof state?.email === 'string' ? state.email : "");

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

          // <div className="flex flex-col gap-6">
          <div>
            {success?.message}

            メール内のリンクをクリックして、メールアドレスの確認を完了してください。
            メールが来ない場合は
            <button onClick={resend} disabled={cooldown>0} className='text-blue-600 underline'>
                こちら
            </button>
            
            をクリックしてください

            {cooldown > 0 && (
                <p className="text-red-500 ml-auto inline-block text-sm underline-offset-4 hover:underline">再送は{cooldown}秒後に可能です</p>
            )}

            
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
                  suppressHydrationWarning

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
              
              {/* PASSWORD */}
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password1"
                  name="password1"
                  type="password1"
                  suppressHydrationWarning

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
                  suppressHydrationWarning

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
                  {pending?"ユーザー登録中...":"ユーザー登録"}
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
