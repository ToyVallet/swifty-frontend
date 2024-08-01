'use client';

import { GlobalNavigation } from '@components/common';
import TicketCard from '@components/ticket/ticket-card';
import { Tabs, TabsTrigger } from '@components/ui/tabs';
import type { UserTicketApi } from '@lib/types';
import { TabsContent, TabsList } from '@radix-ui/react-tabs';
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '@swifty/ui';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = {
  availableTickets: UserTicketApi[];
  overDateTickets: UserTicketApi[];
};

const TicketTypes = ['진행 예정', '진행 완료'] as const;

export default function TicketDrawer({
  availableTickets,
  overDateTickets,
}: Props) {
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
        <section className="px-[30px] py-[50px] h-[90%]">
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
      </DrawerContent>
    </Drawer>
  );
}
