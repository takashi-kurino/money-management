'use client';

import { cn } from "@/lib/utils"
import { useLogout } from '@/app/(auth)/hooks/useLogout';
import {Button} from '../ui/button';

export default function LoggoutButton() {
    const logout = useLogout();
    
    return (
        <div className={cn("flex flex-col gap-6")}>
            <Button onClick={logout} type="button">
                ログアウト
            </Button>
        </div>
    );
}