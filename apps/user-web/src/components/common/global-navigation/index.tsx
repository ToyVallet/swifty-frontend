'use client';

import { useUser } from '@app/context/user-context';
import Category from '@icons/global-navigation/category.svg';
import HomeIcon from '@icons/global-navigation/home.svg';
import LockIcon from '@icons/global-navigation/lock.svg';
import SearchIcon from '@icons/global-navigation/magnifier.svg';
import TicketIcon from '@icons/global-navigation/ticket.svg';
import UserIcon from '@icons/global-navigation/user.svg';
import { Choose, Otherwise, When } from '@swifty/ui';
import Link from 'next/link';

import IconButton from './icon-button';

export default function GlobalNavigation() {
  const user = useUser();
  return (
    <nav className="fixed bottom-0 left-0 right-0 flex items-center justify-evenly bg-black shadow-[0px_-5px_7px_0px_rgba(0, 0, 0, 0.4)]">
      <IconButton label="홈" link="/" Icon={HomeIcon} />
      <IconButton label="카테고리" link="/category" Icon={Category} />

      <div>
        <Link
          href="/ticket"
          className="w-[50px] h-[50px] rounded-full bg-primary flex items-center justify-center mx-[14px] -translate-y-2"
        >
          <TicketIcon />
        </Link>
      </div>

      <IconButton label="검색" link="/search" Icon={SearchIcon} />
      <Choose value={user}>
        <When value={null}>
          <IconButton label="로그인" link="/login" Icon={LockIcon} />
        </When>
        <Otherwise>
          <IconButton label="마이페이지" link="/user" Icon={UserIcon} />
        </Otherwise>
      </Choose>
    </nav>
  );
}
