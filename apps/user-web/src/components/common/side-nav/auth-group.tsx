'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { SheetClose } from '@components/ui/sheet';
import { cn } from '@swifty/shared-lib';
import { Choose, Otherwise, When } from '@swifty/ui';
import { IoChevronForwardOutline } from 'react-icons/io5';
import {
  IoPersonCircleOutline,
  IoPersonSharp,
  IoTicketOutline,
} from 'react-icons/io5';
import { MdLogin, MdLogout } from 'react-icons/md';
import { useAuth } from 'src/hooks';

import NavLink from './nav-link';

export default function AuthGroup({ className }: { className?: string }) {
  const { logout, isLoggedIn, isAdmin, userInfo } = useAuth();

  return (
    <div className="w-full">
      <Choose value={isLoggedIn}>
        <When value={true}>
          <Choose value={isAdmin}>
            <When value={true}>
              <NavLink link="/admin" className={className}>
                <IoPersonSharp className="mr-2" />
                관리자 페이지
              </NavLink>
            </When>

            <Otherwise>
              <NavLink
                privateRoute
                link="/mypage"
                className={cn(
                  'dark:bg-neutral-900 bg-neutral-100 w-full p-3 rounded-lg mb-4',
                  className,
                )}
              >
                <div className="w-full flex flex-col gap-4 pt-1">
                  <div className="w-full flex items-center justify-center gap-2">
                    <Avatar className="w-6 h-6 ring-1 ring-offset-1">
                      <AvatarImage
                        className="object-cover"
                        src={userInfo?.profileImage}
                      />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-neutral-500">
                      안녕하세요,{' '}
                      <strong className="font-medium text-black dark:text-white">
                        {userInfo?.username} 님!
                      </strong>
                    </span>
                  </div>

                  <div className="text-neutral-500 text-sm flex items-center justify-end">
                    <IoPersonCircleOutline className="mr-2" /> 마이페이지
                    <IoChevronForwardOutline size={16} />
                  </div>
                </div>
              </NavLink>
              <NavLink link="/my-tickets" className={className}>
                <IoTicketOutline className="mr-2" />내 티켓
              </NavLink>
            </Otherwise>
          </Choose>

          <SheetClose className={className} onClick={logout}>
            <MdLogout />
            로그아웃
          </SheetClose>
        </When>

        <Otherwise>
          <NavLink link="/login" className={className}>
            <MdLogin className="mr-2" />
            로그인
          </NavLink>
        </Otherwise>
      </Choose>
    </div>
  );
}