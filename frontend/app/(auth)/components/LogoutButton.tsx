'use client';

import { useRouter } from "next/navigation"
import { useState } from "react";

import { cn } from "@/_lib/utils"
import { Logout } from "@/app/(auth)/clientactions"
import { Button } from '@/_components/ui/button';

export default function LogoutButton() {
    const [error, setError] = useState<string | null>(null)
    const [isLoading,setIsLoading] = useState(false)
    const router = useRouter()

    const handleClick = async () => {
        setIsLoading(true)
        const res = await Logout()

        if (!res) {
            setError("ログアウトに失敗しました。")
            return
        }

        router.push("/login")
        router.refresh()
    }
    
    return (
        <div className={cn("flex flex-col gap-6")}>
            <Button onClick={handleClick} type="button">
                {isLoading?"ログアウト中...":"ログアウト"}
            </Button>
            <p className="color:red">{error}</p>
        </div>
    );
}