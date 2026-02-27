// frontend/app/login2/page.tsx

'use client';
import { PasswordResetForm } from "@/app/(auth)/components/PasswordReset"
import WithSuspense from "@/components/common/WithSuspense";


export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <WithSuspense>
          <PasswordResetForm />
        </WithSuspense>
        
      </div>
    </div>
  )
}
