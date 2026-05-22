'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { Suspense } from 'react';

export default function ProgressBarProvider() {
  return (
    <Suspense>
      <ProgressBar 
        height="4px"
        color="#477bff" 
        options={{ showSpinner: false }}
        shallowRouting />
    </Suspense>
  );
}