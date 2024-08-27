import { type PropsWithChildren } from 'react';

export default function VerificationLayout({ children }: PropsWithChildren) {
  return <div className="w-full h-full overflow-hidden">{children}</div>;
}
