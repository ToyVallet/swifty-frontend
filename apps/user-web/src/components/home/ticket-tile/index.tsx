import { Card } from '@components/ui/card';

import TileHeader from '../tile-header';
import TicketButton from './ticket-button';

export default function TicketTile() {
  return (
    <div className="w-full">
      <TileHeader>
        <TileHeader.Head>제목</TileHeader.Head>
      </TileHeader>
      <Card className="w-full h-32 flex justify-between p-4 rounded-2xl">
        <div className="text-neutral-50 h-full flex flex-col justify-between">
          <h4 className="font-bold text-sm dark:text-neutral-50 text-neutral-900">
            부제목
          </h4>
          <div className="flex flex-col gap-0">
            <span className="text-[11px] dark:text-neutral-500 text-neutral-900 leading-[0.8rem]">
              0
            </span>
            <h3 className="text-primary font-bold text-base">티켓 없음</h3>
          </div>
          <span className="text-[8px] dark:text-neutral-500 text-neutral-600 leading-[8px] max-w-60">
            설명
          </span>
        </div>
        <TicketButton label={'터치해서 보기'} />
      </Card>
    </div>
  );
}
