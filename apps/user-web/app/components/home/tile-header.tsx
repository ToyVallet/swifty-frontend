import { cn } from '@/app/lib/utils';
import { Link } from '@components/common';
import type { PropsWithChildren } from 'react';

export default function TileHeader({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={cn(
        'w-full flex justify-between items-end lg:max-w-full lg:w-full',
        className,
      )}
    >
      {children}
    </div>
  );
}

function Head({ children }: PropsWithChildren) {
  return <h3 className="text-2xl font-bold">{children}</h3>;
}

TileHeader.Head = Head;

async function SeeAll({
  children,
  href,
}: PropsWithChildren<{
  href: string;
}>) {
  return (
    <Link
      href={href}
      className="text-base font-normal text-primary w-auto p-1 h-auto dark:text-primary"
      variant="transparent"
    >
      {children}
    </Link>
  );
}

TileHeader.SeeAll = SeeAll;
