'use client';

import TicketCard from '@components/ticket/ticket-card';
import { Tabs, TabsTrigger } from '@components/ui/tabs';
import type { UserTicketApi } from '@lib/types';
import { TabsContent, TabsList } from '@radix-ui/react-tabs';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { Icon } from '@swifty/assets';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from '@swifty/ui';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = {
  availableTickets: UserTicketApi[];
  overDateTickets: UserTicketApi[];
  backUrl?: string;
};

const TicketTypes = ['진행 예정', '진행 완료'] as const;

export default function TicketDrawer({
  availableTickets,
  overDateTickets,
  backUrl = '/',
}: Props) {
  const [open] = useState(true);

  const router = useRouter();
  const onOpenChange = async (open: boolean) => {
    if (!open) {
      router.back();
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <a
          href={backUrl}
          className="flex items-center text-16 font-medium gap-2 px-5"
        >
          <Icon
            name="arrow-left"
            className="stroke-black dark:stroke-white"
            width={40}
            height={40}
          />
          {backUrl === '/' ? 'HOME' : 'MY PAGE'}
        </a>
        <section className="px-[30px] py-10 h-[90%]">
          <DrawerTitle className="text-26 font-bold">얘매한 티켓</DrawerTitle>
          <Tabs defaultValue={TicketTypes[0]}>
            <TabsList className="flex gap-5">
              {TicketTypes.map((tab) => (
                <TabsTrigger key={tab} value={tab}>
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value={TicketTypes[0]}>
              <div className="mt-4 flex flex-col gap-4">
                {availableTickets.map((ticket) => (
                  <TicketCard key={ticket.ticketId} {...ticket} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value={TicketTypes[1]}>
              <div className="mt-4 flex flex-col gap-4">
                {overDateTickets.map((ticket) => (
                  <TicketCard key={ticket.ticketId} {...ticket} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>
        <VisuallyHidden.Root>
          <DrawerDescription>
            티켓 정보를 보여줍니다<div className=""></div>
          </DrawerDescription>
        </VisuallyHidden.Root>
      </DrawerContent>
    </Drawer>
  );
}
