'use client';

import { PasswordResetConfirmPage } from "@/app/(auth)/components/PasswordResetForm";
import WithSuspense from "@/components/common/WithSuspense";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <WithSuspense>
          <PasswordResetConfirmPage />
        </WithSuspense>
      </div>
    </div>
  );
}
