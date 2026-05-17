// app/(auth)/registration/verify-email/page.tsx
import VerifyEmailContent from "@/app/(auth)/components/VerifyEmailContent"
import { Suspense } from 'react'

export default function Page() {
  return (
    <Suspense fallback={<div>読み込み中...</div>}>
      <VerifyEmailContent />  {/* useSearchParams はここに移す */}
    </Suspense>
  )
}