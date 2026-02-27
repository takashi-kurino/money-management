'use client';

import { useState } from 'react';
import { useAccountDelete } from '@/app/(auth)/hooks/useAccountdelete';
import { Button } from '@/components/ui/button';
import { cn } from "@/lib/utils"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function AccountDeleteForm() {
    
    const {deleteaccount , error} = useAccountDelete();
    const [password, setPassword] = useState('');
    const [buttonflag, setButtonflag] = useState(true);

    return (
        <div className={cn("flex flex-col gap-6")}>
        <Card>
            <CardHeader>
            <CardTitle >
                
                    アカウント削除
                
            </CardTitle>
            
            {!buttonflag &&(

                <CardDescription>
                    <div>
                        <span className="font-bold text-red-600">この操作は取り消せません。</span>
                    </div>
                </CardDescription>

            )}

            </CardHeader>
            {buttonflag &&(
                <CardContent>
                    <div className="flex flex-col gap-3">
                        <Button type="submit" className="w-full color:red-600 hover:bg-red-700 bg-red-500 text-white" onClick={() => setButtonflag(false)}>
                            パスワードを入力する
                        </Button>
                        
                    </div>
                </CardContent>
            )}
            {!buttonflag &&(
                <CardContent>
                <form method="POST" className="space-y-6" onSubmit={(e) => deleteaccount(e,password)}>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-3">
                            <Label htmlFor="user">password</Label>
                            <Input
                            id="password"
                            type="password"
                            placeholder=""
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            />
                        </div>
                        
                        {error && (
                        <p className="text-red-500 ml-auto inline-block text-sm underline-offset-4 hover:underline">{error}</p>
                        )}
                    </div>

                    <div className="flex flex-col gap-3">
                        <Button type="submit" className="w-full color:red-600 hover:bg-red-700 bg-red-500 text-white">
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
