import { FixedBottomGroup } from '@components/common';
import { Button } from '@swifty/ui';
import Link from 'next/link';

export default function Page() {
  return (
    <div>
      Done
      <FixedBottomGroup className="flex flex-col gap-2.5">
        <Button size="full" variant="white" asChild>
          <Link href="/login">로그인하기</Link>
        </Button>
        <Button size="full" asChild>
          <Link href="/">홈으로 가기</Link>
        </Button>
      </FixedBottomGroup>
    </div>
  );
}
