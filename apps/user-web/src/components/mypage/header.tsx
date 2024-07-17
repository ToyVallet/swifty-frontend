import { type PropsWithChildren } from 'react';

export default function Header({ children }: PropsWithChildren) {
  return <h3 className="py-5 text-20 font-bold text-white">{children}</h3>;
}
