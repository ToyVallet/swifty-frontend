import { cn } from '@swifty/shared-lib';
import { convertNewlineToJSX } from '@toss/react';

export default function Instruction({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <h1 className={cn('text-center text-26 font-bold mt-[26px]', className)}>
      {convertNewlineToJSX(children)}
    </h1>
  );
}
