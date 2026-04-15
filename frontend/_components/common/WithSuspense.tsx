'use client';

import { Suspense, ReactNode } from 'react';

export default function WithSuspense({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<div>読み込み中...</div>}>
      {children}
    </Suspense>
  );
}
