
'use client';

import { useState } from 'react';
import { useRegistration } from '@/app/(auth)/hooks/useRegistration';
import { useRegistrationResendEmail } from '@/app/(auth)/hooks/useRegistrationResendEmail';

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

export function RegistrationFrom({
  className,
  ...props
}: React.ComponentProps<"div">) {

    const {handleRegistration,error,usererror,emailerror, passworderror,confirmpassworderror,loading,success} = useRegistration();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const {resend,cooldown} = useRegistrationResendEmail(email)

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
            {success &&(
                <CardHeader>
                    <CardTitle>確認メールを送信しました</CardTitle>
                    <CardDescription>
                        <div className='my-2'>
                            
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
                    </CardDescription>
                    
                </CardHeader>)
                }
                
                
            {!success && (
                <CardHeader>
                    <CardTitle>アカウント登録</CardTitle>
                    <CardDescription>
                        情報を入力してください。
                    </CardDescription>
                </CardHeader>
            )}
            {!success && (

                <CardContent>
                    <form method="POST" className="space-y-6" onSubmit={(e) => handleRegistration(e, username,email,password,confirmPassword)}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="user">Username</Label>
                                <Input
                                    id="user"
                                    type="user"
                                    placeholder=""
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            {usererror && (
                                <p className="text-red-500 ml-auto inline-block text-sm underline-offset-4 hover:underline">{usererror}</p>
                            )}
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder=""
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            {emailerror && (
                                <p className="text-red-500 ml-auto inline-block text-sm underline-offset-4 hover:underline">{emailerror}</p>
                            )}
                            <div className="grid gap-3">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                
                                </div>
                                <Input 
                                    id="password" 
                                    type="password" 
                                    onChange={(e) => setPassword(e.target.value)}
                                    required 
                                    />
                            </div>
                            {passworderror && (
                                <p className="text-red-500 ml-auto inline-block text-sm underline-offset-4 hover:underline">{passworderror}</p>
                            )}
                            <div className="grid gap-3">
                                <div className="flex items-center">
                                    <Label htmlFor="confirmPassword">Password確認用</Label>
                                
                                </div>
                                <Input 
                                    id="password" 
                                    type="password" 
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required 
                                    />
                            </div>
                            {confirmpassworderror && (
                                <p className="text-red-500 ml-auto inline-block text-sm underline-offset-4 hover:underline">{confirmpassworderror}</p>
                            )}
                            <div className="flex flex-col gap-3">
                                <Button type="submit" className="w-full">
                                    登録
                                </Button>
                                
                            </div>
                        </div>
                    
                    </form>
                </CardContent>
            )}
        </Card>
        </div>
    )
}
