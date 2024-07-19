import { FixedBottomCTA } from '@components/common';
import VerificationDoneIcon from '@icons/verification/verification-done.svg';
import VerificationRequest from '@icons/verification/verification-request.svg';
import VerificationIcon from '@icons/verification/verification.svg';
import { cn } from '@swifty/shared-lib';
import { convertNewlineToJSX } from '@toss/react';
import { cva } from 'class-variance-authority';
import Link from 'next/link';
import type { PropsWithChildren, ReactNode } from 'react';

type Props = {
  step: Server;
  message?: string;
};
type Server = 'WATING' | 'REJECTED' | 'APPROVED' | 'NONE';
type Status = 'not' | 'yet' | 'during' | 'done' | 'sucess' | 'fail';

type ServerStatus = {
  [key in Server]: {
    title: ReactNode;
    data: { title: string; icon: JSX.Element; status: Status }[];
  };
};

// 데이터
const serverStatus: ServerStatus = {
  NONE: {
    title: <>재학생 인증을 요청하지 않았습니다</>,
    data: [
      { title: '진행 예정', icon: <VerificationRequest />, status: 'not' },
      { title: '인증 진행', icon: <VerificationIcon />, status: 'not' },
      { title: '인증 완료', icon: <VerificationDoneIcon />, status: 'not' },
    ],
  },
  WATING: {
    title: (
      <>
        재학생 인증은 <span className="text-primary">인증 진행 중</span> 입니다
      </>
    ),
    data: [
      {
        title: '진행 예정',
        icon: <VerificationRequest fill={'#1760EF'} />,
        status: 'done',
      },
      { title: '인증 진행', icon: <VerificationIcon />, status: 'during' },
      { title: '인증 완료', icon: <VerificationDoneIcon />, status: 'yet' },
    ],
  },
  REJECTED: {
    title: (
      <>
        재학생 인증이{' '}
        <span className="text-[rgb(255, 0, 77)]">반려되었습니다.</span>
      </>
    ),
    data: [
      {
        title: '진행 예정',
        icon: <VerificationRequest fill={'#1760EF'} />,
        status: 'done',
      },
      {
        title: '인증 진행',
        icon: <VerificationIcon fill={'#1760EF'} />,
        status: 'done',
      },
      { title: '인증 완료', icon: <VerificationDoneIcon />, status: 'fail' },
    ],
  },
  APPROVED: {
    title: (
      <>
        재학생 인증은{' '}
        <span className="text-swifty-color-green">승인되었습니다</span>
      </>
    ),
    data: [
      {
        title: '진행 예정',
        icon: <VerificationRequest fill={'#1760EF'} />,
        status: 'done',
      },
      {
        title: '인증 진행',
        icon: <VerificationIcon fill={'#1760EF'} />,
        status: 'done',
      },
      { title: '인증 완료', icon: <VerificationDoneIcon />, status: 'sucess' },
    ],
  },
};

// 전체 컴포넌트
export default function VerificationStatus({ step, message }: Props) {
  const { title, data } = serverStatus[step];
  return (
    <div className="mt-[47px]">
      <VerificationTitle>{title}</VerificationTitle>
      <VerificationData verificationStatus={data} message={message} />
      {step === 'NONE' ||
        (step === 'REJECTED' && (
          <FixedBottomCTA asChild>
            <Link href={'/verification/student'}>인증 요청하기</Link>
          </FixedBottomCTA>
        ))}
    </div>
  );
}

// 진행 예정, 진행 필수, 완료, 성공, 실패 알림
const statusNotiVariants = cva(
  'text-white py-1 w-[90px] font-semibold text-center rounded-[20px]',
  {
    variants: {
      status: {
        not: 'bg-swifty-color-800',
        yet: 'bg-swifty-color-800',
        during: 'bg-swifty-color-500',
        done: 'bg-primary',
        sucess: 'bg-swifty-color-green',
        fail: 'bg-[#ff004d]',
      },
    },
    defaultVariants: {
      status: 'not',
    },
  },
);

type StatusNotiProps = {
  status: Status;
};
function StatusNoti({ status }: StatusNotiProps) {
  return (
    <div className={cn(statusNotiVariants({ status }))}>
      <span className="text-14">
        {status === 'not' && '진행 필요'}
        {status === 'yet' && '진행 예정'}
        {status === 'during' && '진행 중'}
        {status === 'done' && '완료'}
        {status === 'sucess' && '성공'}
        {status === 'fail' && '실패'}
      </span>
    </div>
  );
}

// 수직 바
function VerticalBar() {
  return (
    <div className="h-[42px] ml-[15px] w-0 border-2 border-primary border-solid" />
  );
}

// 제목
function VerificationTitle({ children }: PropsWithChildren) {
  return (
    <h1 className="text-22 text-white font-semibold">
      현재 사용자 님의<br></br> {children}
    </h1>
  );
}

// 인증 요청, 인증 진행, 인증 완료
type VerificationStepProps = {
  title: string;
  icon: JSX.Element;
  status: Status;
};

function VerificationStep({ title, icon, status }: VerificationStepProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-[30px] items-center justify-between">
        {icon}
        <span className="text-18 text-white font-bold">{title}</span>
      </div>
      <StatusNoti status={status} />
    </div>
  );
}

// 인증 완료, 인증 요청, 인증 진행 배치
type VerificationDataProps = {
  verificationStatus: VerificationStepProps[];
  message?: string;
};

function VerificationData({
  verificationStatus,
  message,
}: VerificationDataProps) {
  return (
    <section className="bg-swifty-color-900 px-5 py-10 rounded-xl mt-10 flex flex-col gap-5">
      {verificationStatus.map((data, index) => {
        if (
          verificationStatus[index - 1]?.status === 'done' &&
          data.status !== 'done'
        ) {
          return (
            <>
              <VerticalBar />
              <VerificationStep key={data.title} {...data} />
            </>
          );
        }
        return <VerificationStep key={data.title} {...data} />;
      })}
      {message && (
        <div className="mx-auto text-12 font-semibold text-center">
          {convertNewlineToJSX(message)}
        </div>
      )}
    </section>
  );
}
