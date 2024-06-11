'use client';

import { Button } from '@swifty/ui';
import { useRouter } from 'next/navigation';
import { MdRefresh } from 'react-icons/md';

export default function RefetchButton() {
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        router.refresh();
      }}
      className="h-full bg-neutral-500 text-neutral-100 flex items-center justify-center cursor-pointer rounded-lg"
    >
      <MdRefresh size={25} />
    </Button>
  );
}
