"use client"

import { usePasswordResetConfirmation } from "@/app/(auth)/hooks/usePaswordresetconfirmation"
import { useSearchParams } from "next/navigation"
import { useState } from "react"

import Link from "next/link"
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

export function PasswordResetConfirmPage() {
  const searchParams = useSearchParams()
  const uid = searchParams.get("uid") || ""
  const token = searchParams.get("token") || ""

  console.log(`${uid} ${uid.length}`);

  const { resetPassword, loading, newpassworderror, confirmpassworderror, error, success } = usePasswordResetConfirmation()
  const [newPassword1, setNewPassword1] = useState("")
  const [newPassword2, setNewPassword2] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (uid && token) {
      await resetPassword(uid, token, newPassword1, newPassword2)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6")}>
        <Card>
          <CardHeader>
          <CardTitle>パスワードリセット</CardTitle>
          {!success && (
            <CardDescription>
                項目を入力してください。
            </CardDescription>
          )}
          </CardHeader>
          <CardContent>
          <form method="POST" className="space-y-6" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                {!success && (
                  <>
                  
                  <div className="grid gap-3">
                    <div className="flex items-center">
                        <Label htmlFor="password">新しいパスワード</Label>
                    
                    </div>
                    <Input 
                        id="new_password1" 
                        type="password" 
                        onChange={(e) => setNewPassword1(e.target.value)}
                        required 
                        />
                  </div>
                  {newpassworderror && (
                    <p className="text-red-500 ml-auto inline-block text-sm underline-offset-4 hover:underline">{newpassworderror}</p>
                  )}
                  <div className="grid gap-3">
                      <div className="flex items-center">
                          <Label htmlFor="password">新しいパスワード再確認</Label>
                      
                      </div>
                      <Input 
                          id="new_password2" 
                          type="password" 
                          onChange={(e) => setNewPassword2(e.target.value)}
                          required 
                          />
                  </div>
                  {confirmpassworderror && (
                    <p className="text-red-500 ml-auto inline-block text-sm underline-offset-4 hover:underline">{confirmpassworderror}</p>
                  )}

                  <div className="flex flex-col gap-3">
                      <Button type="submit" className="w-full">
                      変更
                      </Button>
                      
                  </div>
                  </>
                )}
            
                {success && (
                  <>
                      <p className="text-green-500 ml-auto inline-block text-sm underline-offset-4 hover:underline">パスワードを変更しました。</p>
                      <Link href="/login">
                        <div>
                          <Button className="w-full">
                            ログイン画面へ
                          </Button>
                        </div>
                      </Link>

                      
                  </>
                  
                )}
                {error && (
                    <p className="text-red-500 ml-auto inline-block text-sm underline-offset-4 hover:underline">{error}</p>
                )}
            </div>
              
          </form>
          </CardContent>
        </Card>      
      </div>
  )
}
