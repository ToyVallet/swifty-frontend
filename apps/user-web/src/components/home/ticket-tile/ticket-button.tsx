'use client';

import { BottomSheet } from '@components/common';
import useBottomSheet from '@hooks/use-bottom-sheet';

type TicketButtonProps = {
  label: string;
};

export default function TicketButton({ label }: TicketButtonProps) {
  const [isOpen, open, close] = useBottomSheet();
  return (
    <>
      <button
        className="flex flex-col items-center gap-[5px] text-center text-[10px] font-bold text-neutral-900 dark:text-white"
        onClick={open}
      >
        {label}
      </button>
      <div className="absolute">
        <BottomSheet header="티켓 보기" isOpen={isOpen} onDismiss={close}>
          아뿔싸! 티켓을 빼앗겼다!
        </BottomSheet>
      </div>
    </>
  );
}
