'use client';

import QrCode from '@components/ticket/qr-code';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Tabs, TabsContent } from '@components/ui/tabs';
import type { TicketingResultApi } from '@lib/types';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { Icon } from '@swifty/assets';
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from '@swifty/ui';
import { convertNewlineToJSX } from '@toss/react';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import type { PropsWithChildren } from 'react';
import { useState } from 'react';

const BUTTON_VALUE = ['얘매자 정보 확인', 'QR 티켓 확인'] as const;

const InfoContainer = ({ children }: PropsWithChildren) => (
  <div className="flex flex-col items-center justify-center gap-2">
    {children}
  </div>
);

const Title = ({ children }: PropsWithChildren) => (
  <h1 className="text-16 font-bold text-center">{children}</h1>
);

const Text = ({ children }: PropsWithChildren) => (
  <h1 className="text-14 font-medium text-center">{children}</h1>
);

type Props = { backUrl?: string } & TicketingResultApi;

export default function TicketDetailDrawer({ backUrl = '/', ...props }: Props) {
  const {
    name,
    qrEmbeddedId,
    ticketIdentifier,
    festivalName,
    concertStartDateTime,
    concertEndDateTime,
  } = props;
  const ticketId = usePathname().split('/')[2]!;
  const [activeTab, setActiveTab] = useState<(typeof BUTTON_VALUE)[number]>(
    BUTTON_VALUE[0],
  );
  const [open, setOpen] = useState(true);

  const router = useRouter();
  const onOpenChange = (open: boolean) => {
    if (!open) {
      setOpen(false);
      router.replace(backUrl);
    }
  };

  const handleTabChange = () => {
    // Logic to switch tabs, you might toggle or set a specific value
    setActiveTab((prevTab) =>
      prevTab === BUTTON_VALUE[0] ? BUTTON_VALUE[1] : BUTTON_VALUE[0],
    );
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <section className="w-full px-[50px] pb-10 pt-5 flex flex-col gap-4 items-center">
          <DrawerTitle className="text-center text-26 font-bold relative w-full">
            <Link href="/ticket" className="absolute left-0">
              <Icon
                name="arrow-left"
                className="stroke-black dark:stroke-white"
                width={40}
                height={40}
              />
            </Link>
            QR 일반 티켓 인증
          </DrawerTitle>
          <header className="flex flex-col gap-2 items-center justify-center">
            <Avatar className="w-[125px] h-[125px] border-4 border-primary">
              <AvatarImage />
              <AvatarFallback>
                <Icon name="user-web/mypage/profile" />
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
          <Tabs value={activeTab} className="w-full h-full">
            <TabsContent value={BUTTON_VALUE[0]}>
              <div className="relative rounded-3xl h-[270px] max-w-[290px] w-full mx-auto">
                <QrCode qr={qrEmbeddedId} ticketId={ticketId} />
              </div>
            </TabsContent>
            <TabsContent value={BUTTON_VALUE[1]}>
              <div className="flex flex-col gap-5 bg-swifty-color-100 dark:bg-swifty-color-900 rounded-3xl py-[25px]">
                <InfoContainer>
                  <Title>행사명</Title>
                  <Text>{convertNewlineToJSX(`${festivalName}`)}</Text>
                </InfoContainer>
                <InfoContainer>
                  <Title>행사 일시</Title>
                  <Text>
                    {convertNewlineToJSX(
                      `${dayjs(concertStartDateTime).format('YYYY년 MM월 DD일')}
                      ${dayjs(concertStartDateTime).format('a h:mm').toUpperCase()} - ${dayjs(concertEndDateTime).format('a h:mm').toUpperCase()}`,
                    )}
                  </Text>
                </InfoContainer>
                <InfoContainer>
                  <Title>얘매 번호</Title>
                  <Text>{ticketIdentifier}</Text>
                </InfoContainer>
              </div>
            </TabsContent>
          </Tabs>

          <Button variant="primary" block onClick={handleTabChange}>
            {activeTab}
          </Button>
        </section>
        <VisuallyHidden.Root>
          <DrawerDescription>티켓 상세정보 및 qr 정보 제공</DrawerDescription>
        </VisuallyHidden.Root>
      </DrawerContent>
    </Drawer>
  );
}
