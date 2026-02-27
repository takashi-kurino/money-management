// frontend/app/login2/page.tsx

'use client';
import { RegistrationFrom } from "@/app/(auth)/components/RegistrationForm"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RegistrationFrom />
      </div>
    </div>
  )
}
