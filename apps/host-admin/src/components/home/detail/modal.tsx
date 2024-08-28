'use client';

import {
  CertificationStatus,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components';
import { Icon } from '@swifty/assets';
import { APIError, cn, http } from '@swifty/shared-lib';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@swifty/ui';
import type { AnswerStatus, UserDetailApi } from '@type';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import PulseLoader from 'react-spinners/PulseLoader';
import { toast } from 'sonner';

export default function Modal(props: UserDetailApi) {
  const router = useRouter();
  const [isOpen] = useState(true);

  const onIsOpne = (open: boolean) => {
    if (!open) {
      router.back();
    }
  };

  const {
    answerStatus,
    ocrMajorData,
    ocrNameData,
    ocrStudentIdData,
    ocrStudentStatusData,
    answerAt,
    rejectReason,
    id,
    file: { url },
  } = props;

  const studentData = [
    { title: '성명', content: ocrNameData },
    { title: '학번', content: ocrStudentIdData },
    { title: '재학 상태', content: ocrStudentStatusData },
    { title: '학과', content: ocrMajorData },
    {
      title: '인증 요청 일시',
      content: dayjs(answerAt).format('YYYY-MM-DD HH:MM:ss'),
    },
  ];
  if (rejectReason)
    studentData.push({ title: '반려 이유', content: rejectReason });
  return (
    <Dialog open={isOpen} onOpenChange={onIsOpne}>
      <DialogContent className="min-w-[821px] min-h-[728px]">
        <DialogHeader>
          <DialogTitle>
            <div className="flex gap-2 items-center mb-[54px]">
              <Icon name="host-admin/document" width={26} height={26} />
              <h1 className="text-22 font-bold text-black">인증 요청 관리</h1>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 mb-2.5 gap-10">
          <UserInfo
            studentData={studentData}
            answerStatus={answerStatus}
            id={id}
          />
          <UserImage image={url} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function UserInfo({
  studentData,
  answerStatus,

  id,
}: {
  studentData: {
    title: string;
    content: string;
  }[];
  answerStatus: AnswerStatus;
  id: string;
}) {
  return (
    <div>
      <DialogDescription>
        <div className="flex flex-col gap-2.5 mb-5">
          <h3 className="text-18 font-bold text-swifty-color-800">
            요청자 기본 정보
          </h3>
          <CertificationStatus status={answerStatus} />
        </div>
      </DialogDescription>
      <div
        className={cn(
          'grid grid-cols-2 grid-rows-3 gap-10 mb-[25px]',
          studentData.length === 6 && 'grid-rows-4',
        )}
      >
        {studentData.map((data) => (
          <InfoItem
            key={data.title}
            {...data}
            className={
              data.title === '인증 요청 일시' || data.title === '반려 이유'
                ? 'col-span-full'
                : ''
            }
          />
        ))}
      </div>
      <div>
        <ButtonGroup id={id} />
      </div>
    </div>
  );
}

function InfoItem({
  title,
  content,

  className,
}: {
  title: string;
  content: string;

  className?: string;
}) {
  return (
    <div
      className={cn('flex flex-col gap-1 items-start w-full h-full', className)}
    >
      <span className="text-16 font-semibold text-swifty-color-500">
        {title}
      </span>
      <span className="text-26 font-medium text-black">{content}</span>
    </div>
  );
}

function ButtonGroup({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState<'APPROVE' | 'REJECT' | null>(null);
  const [selectValue, setSelectValue] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onApprove = async () => {
    setLoading('APPROVE');
    try {
      await http.patch(
        '/host/admin/certification/answer/{id}/approval',
        {},
        { params: { id }, credentials: 'include' },
      );
      router.back();
    } finally {
      setLoading(null);
    }
  };

  const onReject = async () => {
    setLoading('REJECT');
    let rejectReason: string | undefined | null = null;
    if (selectValue !== '직접 입력') rejectReason = selectValue;
    else rejectReason = inputRef.current?.value;
    try {
      if (!rejectReason)
        throw new Error('반려 사유를 선택하거나, 입력해주세요');

      await http.patch(
        '/host/admin/certification/answer/{id}/reject',
        { rejectReason },
        { params: { id }, credentials: 'include' },
      );
      router.back();
    } catch (err) {
      if (err instanceof APIError) {
        toast.error(err.message[0]);
      } else if (err instanceof Error) {
        toast.error(err.message);
      }
    } finally {
      setLoading(null);
    }
  };

  const onValueChange = (value: string) => {
    setSelectValue(value);
  };

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex gap-2.5 text-white font-bold text-16">
        <button
          className="w-full py-2 bg-[#34c759] rounded-xl flex items-center justify-center"
          onClick={onApprove}
          disabled={loading !== null}
        >
          {loading === 'APPROVE' ? <PulseLoader /> : '승인 처리'}
        </button>
        <button
          className="w-full py-2 bg-destructive rounded-xl flex items-center justify-center"
          onClick={onReject}
          disabled={loading !== null}
        >
          {loading === 'REJECT' ? <PulseLoader /> : '반려 처리'}
        </button>
      </div>
      <Select onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="반려사유 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="사진이 불분명합니다.">
            사진이 불분명합니다.
          </SelectItem>
          <SelectItem value="입력 정보와 사진 정보가 일치하지 않습니다.">
            입력 정보와 사진 정보가 일치하지 않습니다.
          </SelectItem>
          <SelectItem value="최근 3개월 이내에 발급된 서류여야 합니다.">
            최근 3개월 이내에 발급된 서류여야 합니다.
          </SelectItem>
          <SelectItem value="직접 입력">직접 입력</SelectItem>
        </SelectContent>
      </Select>
      <input
        ref={inputRef}
        className={cn(
          'px-5 py-3 bg-white border text-16 font-medium border-swifty-color-300 rounded-xl transition-all',
          selectValue !== '직접 입력' && 'bg-swifty-color-100',
        )}
        placeholder="직접 입력"
        disabled={selectValue !== '직접 입력'}
      />
    </div>
  );
}
function UserImage({ image }: { image: string }) {
  return (
    <DialogDescription>
      <h3 className="text-18 font-bold text-swifty-color-800 mb-[30px]">
        제출 서류 확인
      </h3>
      <Image
        src={image}
        alt="학적 인증"
        width={375}
        height={511}
        className="object-fill rounded-xl"
      />
    </DialogDescription>
  );
}
