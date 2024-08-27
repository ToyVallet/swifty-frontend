'use client';

import type { TicketingDate } from '@app/(backable)/festival/[id]/ticketing/@date/page';
import { openToast } from '@lib/utils';
import { http } from '@swifty/shared-lib';
import { Button, Drawer, DrawerContent } from '@swifty/ui';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { Dispatch, SetStateAction } from 'react';
import { type PropsWithChildren, useState } from 'react';

import Tile from './tile';

export type TileInfo = {
  id: number;
  festivalId: string;
  subtitle: string;
  title: JSX.Element;
  link: string;
  icon: React.ReactNode;
  bgColor: string;
  textColor?: string;
  isCertificate?: boolean;
};

// Ticket 활성화 여부 확인 API
async function getTicketAvailable(id: string) {
  try {
    const ticketings = await http.get<TicketingDate[]>('/ticketing/{id}', {
      credentials: 'include',
      params: { id },
    });
    return ticketings.some((ticketing) => ticketing.ticketingAvailable);
  } catch (err) {
    return false;
  }
}

export const TileHeader = ({ children }: PropsWithChildren) => (
  <div className="font-bold leading-6">{children}</div>
);

export default function MenuTiles({ tiles }: { tiles: TileInfo[] }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  /*TICKET TILE CONTROL FUNCTION */
  const controlTicket = async (
    isCertificate: boolean | undefined,
    festivalId: string,
    link: string,
  ) => {
    const isAvaliable = await getTicketAvailable(festivalId);
    if (isAvaliable && isCertificate) {
      router.push(link);
    }
    if (!isCertificate) {
      // 학적 인증
      setIsOpen(true);
    } else if (!isAvaliable) {
      // 모달
      openToast('현재는 티켓 예매가\n 가능한 시간이 아닙니다.');
    }
  };

  return (
    <div className="w-full grid grid-cols-2 gap-4 lg:flex lg:max-w-full lg:aspect-auto lg:gap-8">
      {tiles.map((tile) => {
        if (tile.subtitle === 'Ticketing') {
          return (
            <Button
              key={tile.id}
              onClick={() =>
                controlTicket(tile.isCertificate, tile.festivalId, tile.link)
              }
              className="text-start"
            >
              <Tile {...tile} />
              <CertificationDrawer open={isOpen} onOpenChange={setIsOpen} />
            </Button>
          );
        }
        return (
          <Link key={tile.id} href={tile.link}>
            <Tile {...tile} />
          </Link>
        );
      })}
    </div>
  );
}

function CertificationDrawer({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const onClose = () => {
    onOpenChange(false);
  };
  const onPush = () => {
    router.push('/verification/student');
  };
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="px-5 pb-10 pt-5 flex flex-col gap-2.5">
          <h1 className="text-22 font-bold">학적 인증이 필요해요</h1>
          <span className="text-18 font-semibold">
            현재 학적 인증이 되어있지 않아요
          </span>
          <div className="mt-2.5 flex flex-col gap-2.5">
            <Button block variant="primary" onClick={onPush}>
              학적 인증하기
            </Button>
            <Button block variant="white" onClick={onClose}>
              닫기
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export { default as Tile } from './tile';
