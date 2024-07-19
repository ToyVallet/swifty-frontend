import Logout from '@components/mypage/logout';
import LeftChevron from '@icons/mypage/left-chevron.svg';
import { cn } from '@swifty/shared-lib';
import Link from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';

import Header from './header';

type UserLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  label: string;
};

export default function UserSection() {
  return (
    <section className="w-full">
      <Header>계정 관리</Header>
      <div className="flex flex-col gap-[10px]">
        <UserLink label="개인정보 관리" href="/mypage/info" />
        <Logout />
        <UserLink label="회원 탈퇴" href="/mypage/delete" />
      </div>
    </section>
  );
}

export function UserLink({ label, className, ...props }: UserLinkProps) {
  return (
    <Link
      {...props}
      className={cn(
        'flex items-center justify-between w-full p-5 text-16 font-semibold text-white bg-swifty-color-900 rounded-xl',
        className,
      )}
    >
      {label}
      <LeftChevron className="w-5 h-5" />
    </Link>
  );
}
