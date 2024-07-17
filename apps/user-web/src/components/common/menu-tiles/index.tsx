import Link from 'next/link';
import type { PropsWithChildren } from 'react';

import Tile from './tile';

export type TileInfo = {
  id: number;
  subtitle: string;
  title: JSX.Element;
  link: string;
  icon: React.ReactNode;
  bgColor: string;
  textColor?: string;
};

export const TileHeader = ({ children }: PropsWithChildren) => (
  <div className="font-bold leading-6">{children}</div>
);

export default function MenuTiles({ tiles }: { tiles: TileInfo[] }) {
  return (
    <div className="w-full grid grid-cols-2 gap-4 lg:flex lg:max-w-full lg:aspect-auto lg:gap-8">
      {tiles.map((tile) => (
        <Link key={tile.id} href={tile.link}>
          <Tile {...tile} />
        </Link>
      ))}
    </div>
  );
}

export { default as Tile } from './tile';
