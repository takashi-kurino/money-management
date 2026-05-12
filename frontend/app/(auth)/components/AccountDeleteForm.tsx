'use client';

import { Button } from '@/_components/ui/button';
import { cn } from "@/_lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/_components/ui/card"
import { Input } from "@/_components/ui/input"
import { Label } from "@/_components/ui/label"
import { useActionState ,useState} from 'react';
import { DeleteAccount } from '../clientactions';

type DeleteAccountResult = {
  password?:string;
  success?:boolean; 
}

const initialState={
  data:null,
  success:false,
}

export function AccountDeleteForm() {
  const [state, formAction, pending] = useActionState(DeleteAccount,initialState)
  const [buttonflag, setButtonflag] = useState(false)
  const result = state?.data as DeleteAccountResult | null

  return (
  <div className={cn("flex flex-col gap-6")}>
    <Card>
      <CardHeader>
        <CardTitle >
          アカウント削除
        </CardTitle>

        {buttonflag ? (

          <CardDescription className="text-red-600">
            この操作は取り消せません。
          </CardDescription>

        ):
        (
          <CardDescription>
            アカウントを削除するには、以下のボタンをクリックしてください。
          </CardDescription>
        )}

      </CardHeader>
      {!buttonflag ? (
      <CardContent>
        <div className="flex flex-col gap-3">
          <Button type="submit" className="w-full color:red-600 hover:bg-red-700 bg-red-500 text-white" onClick={() => setButtonflag(true)}>
              パスワードを入力する
          </Button>

        </div>
      </CardContent>
      ):
      (
      <CardContent>
        <form className="space-y-6" action={formAction}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
                <Label htmlFor="user">password</Label>
                <Input
                id="password"
                type="password"
                name="password"

                />
            </div>

            {result?.password && (
              <p className="text-red-500 ml-auto inline-block text-sm underline-offset-4 hover:underline">{result.password}</p>
              
            )}
          </div>

          <div className="flex flex-col gap-3">
            <Button disabled={pending} type="submit" className="w-full color:red-600 hover:bg-red-700 bg-red-500 text-white">
                削除
            </Button>
          </div>
        </form>
      </CardContent>
      )}

    </Card>
  </div>
  )
}
