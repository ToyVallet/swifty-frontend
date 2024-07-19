'use client';

import { FixedBottomCTA } from '@components/common';
import Link from 'next/link';
import { useFormContext } from 'react-hook-form';

export default function Page() {
  const form = useFormContext();
  const id = form.getValues('findId') || '';
  return (
    <div>
      <div className="w-full bg-swifty-color-800 text-white text-center text-16 font-medium py-[13px] rounded-xl">
        {id}
      </div>
      <FixedBottomCTA asChild>
        <Link href="/login">로그인 하기</Link>
      </FixedBottomCTA>
    </div>
  );
}
