import Tile from '@components/common/carousel/tile';
import type { FestivalInfo } from '@lib/types';
import { Choose, When } from '@swifty/ui';

import Carousel from '../common/carousel';
import TileHeader from './tile-header';

type Props = {
  festivals: FestivalInfo[];
  variant?: 'carousel' | 'grid';
  headerPosiion?: 'start' | 'center';
};

async function FestivalTiles({
  festivals,
  variant = 'carousel',
  headerPosiion = 'start',
}: Props) {
  return (
    <div className="flex flex-col gap-5 items-center text-white bg-black">
      <TileHeader
        className={headerPosiion === 'center' ? 'justify-center' : ''}
      >
        축제 리스트
      </TileHeader>
      <Choose value={variant}>
        <When value="carousel">
          <FestivalCarousel festivals={festivals} />
        </When>
        <When value="grid">
          <FestivalGrid festivals={festivals} />
        </When>
      </Choose>
    </div>
  );
}

function FestivalCarousel({ festivals }: { festivals: Props['festivals'] }) {
  return (
    <Carousel className="gap-3" loop={false}>
      {festivals.map((festival, idx) => (
        <Tile key={idx} {...festival} />
      ))}
    </Carousel>
  );
}

function FestivalGrid({ festivals }: { festivals: Props['festivals'] }) {
  return (
    <div className="grid gap-3 grid-cols-2">
      {festivals.map((festival, idx) => (
        <Tile key={idx} {...festival} />
      ))}
    </div>
  );
}

export default FestivalTiles;
