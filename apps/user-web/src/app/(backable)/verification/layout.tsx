import { type PropsWithChildren } from 'react';

export default function SearchLayout({ children }: PropsWithChildren) {
  return <div className="px-5 w-full h-full">{children}</div>;
}
