'use client';

import { Link } from '@components/common';
import type Error from 'next/error';

export type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex h-[100dvh] w-full flex-col items-center justify-center">
          <h2 className="text-20">에러!</h2>
          <Link
            href="/login"
            className="w-full h-full flex items-center justify-center"
          >
            홈으로
          </Link>
        </div>
      </body>
    </html>
  );
}
