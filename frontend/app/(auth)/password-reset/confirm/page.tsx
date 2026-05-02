'use client';

import { PasswordResetConfirmForm } from "@/app/(auth)/components/PasswordResetConfirmForm";
import WithSuspense from "@/_components/common/WithSuspense";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <WithSuspense>
          <PasswordResetConfirmForm />
        </WithSuspense>
      </div>
    </div>
  );
}
