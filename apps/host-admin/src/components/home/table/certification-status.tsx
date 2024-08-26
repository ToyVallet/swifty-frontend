import { cn } from '@swifty/shared-lib';
import type { AnswerStatus } from '@type';

export default function CertificationStatus({
  status,
}: {
  status: AnswerStatus;
}) {
  return (
    <div
      className={cn(
        'text-center rounded-lg py-2 px-10 max-w-[190px]',
        status === 'APPROVED' && 'bg-[#34c759]',
        status === 'REJECTED' && 'bg-destructive',
        status === 'PENDING' && 'bg-[#30b0c7]',
      )}
    >
      <span className="text-white text-16 font-bold">
        {status === 'PENDING' && '승인 처리 대기'}
        {status === 'APPROVED' && '승인 처리 완료'}
        {status === 'REJECTED' && '반려 처리 완료'}
      </span>
    </div>
  );
}
