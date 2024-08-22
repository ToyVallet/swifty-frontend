'use client';

import { Instruction } from '@components';
import check from '@images/check.png';
import { timer } from '@util';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DynamicCompletePage() {
  const router = useRouter();

  useEffect(() => {
    timer(() => {
      router.push('/dynamic');
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-[26px]">
      <Image src={check} height={337} width={337} alt="done" />
      <Instruction>{'티켓리 확인 되었습니다\n 입장해주세요'}</Instruction>
    </div>
  );
}
