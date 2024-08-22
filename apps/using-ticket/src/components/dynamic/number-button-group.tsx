'use client';

import { APIError, http } from '@swifty/shared-lib';
import type { DynamicSendSms } from '@type';
import { timer } from '@util';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function NumberButtonGroup({ id, codes }: DynamicSendSms) {
  const router = useRouter();
  const handleClick = async (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;

    // 클릭된 요소가 버튼인지 확인
    if (target.tagName === 'BUTTON') {
      const number = target.textContent;
      try {
        await http.post('/host/admin/entrance/dynamic/check-sms', {
          ticketId: id,
          smsCode: number,
        });
      } catch (err) {
        if (APIError.isAPIError(err)) {
          toast.error(err.message);
        }

        timer(() => {
          router.push('/dynamic');
        }, 1000);
      }
    }
  };
  return (
    <div onClick={handleClick} className="grid grid-rows-2 grid-cols-3 gap-5">
      {codes.map((code) => (
        <NumberButton key={code} number={code} />
      ))}
    </div>
  );
}

function NumberButton({ number }: { number: string }) {
  return (
    <motion.button
      className="w-[100px] h-[100px] rounded-full border border-primary text-center text-40 text-primary font-semibold"
      whileTap={{
        scale: 0.95,
      }}
      transition={{
        duration: 0.1,
        ease: 'easeInOut',
      }}
    >
      {number}
    </motion.button>
  );
}
