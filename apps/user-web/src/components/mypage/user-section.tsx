'use client';

import LeftChevron from '@icons/mypage/left-chevron.svg';
import { useRouter } from 'next/navigation';

import Header from './header';

type UserLinkProps = {
  label: string;
  onClick?: () => void;
};

export default function UserSection() {
  const router = useRouter();
  return (
    <section className="w-full">
      <Header>계정 관리</Header>
      <div className="flex flex-col gap-[10px]">
        <UserLink
          label="개인정보 관리"
          onClick={() => router.push('/mypage/info')}
        />
        <UserLink label="로그아웃" />
        <UserLink label="회원 탈퇴" />
      </div>
    </section>
  );
}

export function UserLink({ label, onClick }: UserLinkProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-between w-full p-5 text-16 font-semibold text-white bg-swifty-color-900 rounded-xl"
    >
      {label}
      <LeftChevron className="w-5 h-5" />
    </button>
  );
}
