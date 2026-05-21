// frontend/app/registration_v1/verify-email/page.tsx    

'use client';
import { VerifyEmail } from "@/app/(auth_v1)/components/RegistrationVerifyEmail"
import WithSuspense from "@/_components/common/WithSuspense";


export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <WithSuspense>
          <VerifyEmail />
        </WithSuspense>
        
      </div>
    </div>
  )
}
