'use client';

import { cn } from "@/_lib/utils"
import { Logout } from "@/app/(auth)/clientactions"
import { Button } from '@/_components/ui/button';

export default function LoggoutButton() {

    function handleClick() {
        Logout()
    }
    
    return (
        <div className={cn("flex flex-col gap-6")}>
            <Button onClick={handleClick} type="button">
                ログアウト
            </Button>
        </div>
    );
}