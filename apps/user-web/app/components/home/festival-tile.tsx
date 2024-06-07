import Tile from '@components/common/carousel/tile';
import type { FestivalInfo } from '@lib/types';

import Carousel from '../common/carousel';
import TileHeader from './tile-header';

interface Props {
  festivals: FestivalInfo[];
  variant?: 'carousel' | 'grid';
  headerPosiion?: 'start' | 'center';
}

async function FestivalTiles({
  festivals,
  variant = 'carousel',
  headerPosiion = 'start',
}: Props) {
  try {
    return (
      <div className="flex flex-col gap-5 w-full text-white bg-bgBlack">
        <TileHeader
          className={headerPosiion === 'center' ? 'justify-center' : ''}
        >
          <TileHeader.Head>제목</TileHeader.Head>
        </TileHeader>
        {variant === 'carousel' && <FestivalCarousel festivals={festivals} />}
        {variant === 'grid' && <FestivalGrid festivals={festivals} />}
      </div>
    );
  } catch (error) {
    const e = error as Error;
    return <span className="w-full text-neutral-500">{e.message}</span>;
  }
}

function FestivalCarousel({ festivals }: { festivals: Props['festivals'] }) {
  return (
    <Carousel className="gap-5">
      {festivals.map((festival, idx) => (
        <Tile key={idx} {...festival} />
      ))}
    </Carousel>
  );
}

function FestivalGrid({ festivals }: { festivals: Props['festivals'] }) {
  return (
    <div className="w-full grid gap-5 grid-cols-2">
      {festivals.map((festival, idx) => (
        <Tile key={idx} {...festival} />
      ))}
    </div>
  );
}

export default FestivalTiles;
