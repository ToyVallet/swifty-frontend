'use client';

import { Link } from '@components/common';
import { Button } from '@swifty/ui';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex h-[100dvh] w-full flex-col items-center justify-center relative">
      <h2 className="text-20">에러!</h2>
      <span className="text-14 text-neutral-500">{error.message}</span>
      <Button asChild size="full">
        <Link href="/">홈으로</Link>
      </Button>
    </div>
  );
}
