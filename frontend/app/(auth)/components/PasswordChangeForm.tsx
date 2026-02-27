'use client';

import { useState } from 'react';
import { usePasswordchange } from '@/app/(auth)/hooks/usePasswordchange';

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

export function PasswordChangeForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

    const {handlePasswordchange,error,oldpassworderror,passworderror,confirmpassworderror,loading ,success} = usePasswordchange();
    const [old_password, setOldPassword] = useState('');
    const [new_password1, setNewPassword1] = useState('');
    const [new_password2, setNewPassword2] = useState('');

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
            <CardHeader>
            <CardTitle>パスワード変更</CardTitle>
            <CardDescription>
                項目を入力してください。
            </CardDescription>
            </CardHeader>
            <CardContent>
            <form method="POST" className="space-y-6" onSubmit={(e) => handlePasswordchange(e, new_password1, new_password2,old_password)}>
                <div className="flex flex-col gap-6">
                    <div className="grid gap-3">
                        <Label htmlFor="user">古いパスワード</Label>
                        <Input
                            id="old_password"
                            type="password"
                            placeholder=""
                            onChange={(e) => setOldPassword(e.target.value)}
                            required
                        />
                    </div>
                    {oldpassworderror && (
                    <p className="text-red-500 ml-auto inline-block text-sm underline-offset-4 hover:underline">{oldpassworderror}</p>
                    )}
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
                    {passworderror && (
                    <p className="text-red-500 ml-auto inline-block text-sm underline-offset-4 hover:underline">{passworderror}</p>
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
                    {success && (
                        <p className="text-green-500 ml-auto inline-block text-sm underline-offset-4 hover:underline">パスワードを変更しました。</p>
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
