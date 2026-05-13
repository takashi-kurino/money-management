// frontend/app/login2/page.tsx

'use client';

import { Separator } from "@/_components/ui/separator"
import LoggoutButton from "@/_components/button/LogoutButton";
import { AccountDeleteForm } from "@/app/(auth)/components/AccountDeleteForm";
import { PasswordChangeForm } from "@/app/(auth)/components/PasswordChangeForm";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        
        {/* <UserInfo /> */}
        <LoggoutButton />

        <Separator className="my-6" />

        <PasswordChangeForm />

        <Separator className="my-6" />
        
        <AccountDeleteForm />
        
      </div>
    </div>
  )
}
