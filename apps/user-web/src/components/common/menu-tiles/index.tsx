'use client';

import { Button, Drawer, DrawerContent } from '@swifty/ui';
import { convertNewlineToJSX } from '@toss/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { Dispatch, SetStateAction } from 'react';
import { type PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

import Tile from './tile';

export type TileInfo = {
  id: number;
  subtitle: string;
  title: JSX.Element;
  link: string;
  icon: React.ReactNode;
  bgColor: string;
  textColor?: string;
  isCertificate?: boolean;
  isAvaliable?: boolean;
};

export const TileHeader = ({ children }: PropsWithChildren) => (
  <div className="font-bold leading-6">{children}</div>
);

export default function MenuTiles({ tiles }: { tiles: TileInfo[] }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const controlTicket = (
    isCertificate: boolean | undefined,
    isAvaliable: boolean | undefined,
    link: string,
  ) => {
    if (isAvaliable && isCertificate) {
      router.push(link);
    }
    if (!isCertificate) {
      // 학적 인증
      setIsOpen(true);
    } else if (!isAvaliable) {
      // 모달
      openToast();
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
                controlTicket(tile.isCertificate, tile.isAvaliable, tile.link)
              }
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

function openToast() {
  toast.custom((t) => (
    <div className="bg-swifty-color-100 text-black dark:bg-black dark:text-white flex flex-col items-center justify-center text-center px-5 pt-10 pb-5 rounded-lg gap-5 x-[346px] y-[198px]">
      <h1 className="text-18 text-bold">
        {convertNewlineToJSX('현재는 티켓 예매가\n 가능한 시간이 아닙니다.')}
      </h1>
      <div className="border border-swifty-color-700 w-full mt-5" />
      <Button
        block
        className="text-16 font-bold"
        onClick={() => toast.dismiss(t)}
      >
        확인
      </Button>
    </div>
  ));
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
