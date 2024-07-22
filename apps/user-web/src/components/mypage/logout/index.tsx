'use client';

import { Icon } from '@swifty/assets';
import { removeAllCookies } from '@swifty/shared-lib';
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from '@swifty/ui';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Logout() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const logout = async () => {
    await removeAllCookies();
    router.replace('/');
  };

  const close = () => setIsOpen(false);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button
          suffix={<Icon name="chevron-right" width={20} height={20} />}
          className="justify-between w-full p-5 bg-swifty-color-900"
        >
          로그아웃
        </Button>
      </DrawerTrigger>
      <DrawerContent className="px-5 mb-10">
        <DrawerTitle>로그아웃</DrawerTitle>
        <DrawerDescription>정말 로그아웃할까요?</DrawerDescription>
        <section className="mt-5 flex flex-col gap-2.5">
          <Button block variant="primary" onClick={logout}>
            로그아웃
          </Button>
          <Button block variant="white" onClick={close}>
            닫기
          </Button>
        </section>
      </DrawerContent>
    </Drawer>
  );
}
