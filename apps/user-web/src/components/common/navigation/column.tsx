import type { PropsWithChildren } from 'react';

export default function Column({ children }: PropsWithChildren) {
  return <div className="h-full flex items-center">{children}</div>;
}