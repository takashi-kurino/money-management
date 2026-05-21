// frontend/app/login2/page.tsx

'use client';

import { PasswordChangeForm } from "@/app/(auth_v1)/components/PasswordChangeForm"
import { AccountDeleteForm } from "@/app/(auth_v1)/components/AccountDeleteForm"

import { Separator } from "@/_components/ui/separator"
import LoggoutButton from "@/_components/button/LogoutButton";

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
