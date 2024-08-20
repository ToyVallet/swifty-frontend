import { convertNewlineToJSX } from '@toss/react';

export default function Instruction({ children }: { children: string }) {
  return (
    <h1 className="text-center text-26 font-bold mt-[26px]">
      {convertNewlineToJSX(children)}
    </h1>
  );
}
