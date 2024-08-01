'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import type { TicketingResultApi } from '@lib/types';
import { Button, Drawer, DrawerContent, DrawerTitle } from '@swifty/ui';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function TicketDetailDrawer(props: TicketingResultApi) {
  const { name } = props;
  const [open] = useState(true);

  const router = useRouter();
  const onOpenChange = (open: boolean) => {
    if (!open) {
      router.back();
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <section className="px-[50px] pb-10 pt-5 h-[90%] flex flex-col gap-4 items-center">
          <DrawerTitle className="text-center text-26 font-bold">
            QR 일반 티켓 인증
          </DrawerTitle>
          <header className="flex flex-col gap-2 items-center justify-center">
            <Avatar className="w-[125px] h-[125px] border-4 border-primary">
              <AvatarImage />
              <AvatarFallback className=" bg-swifty-color-900 text-white">
                이미지 없음
              </AvatarFallback>
            </Avatar>
            <h1 className="text-32 font-bold">{name}님</h1>
            <span className="text-14 font-bold">
              QR 코드를 입장 기기에 인식 시켜주세요
            </span>
            <span className="text-14 font-medium">
              본 QR코드는 15초마다 갱신됩니다.
            </span>
          </header>
          <div className="bg-swifty-color-200 w-[290px] h-[290px] rounded-3xl"></div>
          <Button variant="primary" block>
            얘매자 정보 확인
          </Button>
        </section>
      </DrawerContent>
    </Drawer>
  );
}
