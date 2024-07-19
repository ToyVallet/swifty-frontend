'use client';

import LeftChevron from '@icons/mypage/left-chevron.svg';
import { COOKIE_KEYS, customFetch, deleteCookie } from '@swifty/shared-lib';
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from '@swifty/ui';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Logout() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const onLogout = async () => {
    await customFetch('/user/logout', {
      method: 'get',
      credentials: 'include',
    });
    await deleteCookie(COOKIE_KEYS.accessToken);
    await deleteCookie(COOKIE_KEYS.refreshToken);
    //router.replace('/');
  };
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <button className="flex items-center justify-between w-full p-5 text-16 font-semibold text-white bg-swifty-color-900 rounded-xl">
          로그아웃
          <LeftChevron className="w-5 h-5" />
        </button>
      </DrawerTrigger>
      <DrawerContent className="px-5 pt-10 mb-10">
        <DrawerTitle>
          <h1 className="text-22 font-bold">로그아웃</h1>
          <span className="text-18 font-semibold">정말 로그아웃할까요?</span>
        </DrawerTitle>
        <section className="mt-5 flex flex-col gap-2.5">
          <Button size="full" onClick={onLogout}>
            로그아웃
          </Button>
          <Button
            variant="white"
            size="full"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            닫기
          </Button>
        </section>
      </DrawerContent>
    </Drawer>
  );
}
