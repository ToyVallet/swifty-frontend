import { type PropsWithChildren } from 'react';

export default function BottomContainer({ children }: PropsWithChildren) {
  return (
    <div className="bg-black rounded-t-xl shadow-[0_-40px_50px_0px_rgba(0,0,0,0.6)] absolute bottom-0 right-0 left-0">
      {children}
    </div>
  );
}
