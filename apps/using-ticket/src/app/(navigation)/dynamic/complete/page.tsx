import { Instruction } from '@components';
import check from '@images/check.png';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const DynamicComplete = dynamic(
  () => import('@components').then((mod) => mod.DynamicComplete),
  { ssr: false },
);

export default function DynamicCompletePage() {
  return (
    <div className="flex flex-col items-center justify-center gap-[26px]">
      <Image src={check} height={337} width={337} alt="done" />
      <Instruction>{'티켓이 확인 되었습니다\n 입장해주세요'}</Instruction>
      <DynamicComplete />
    </div>
  );
}
