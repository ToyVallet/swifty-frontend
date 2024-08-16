import { type PropsWithChildren } from 'react';

export default function FacepassLayout({ children }: PropsWithChildren) {
  return <div className="px-5 w-full h-full">{children}</div>;
}
