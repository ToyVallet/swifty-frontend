'use client';

import { Button } from '@swifty/ui';
import { convertNewlineToJSX } from '@toss/react';
import { toast } from 'sonner';

export default function openToast(title: string) {
  toast.custom(
    (t) => (
      <div className="bg-swifty-color-100 text-black dark:bg-black dark:text-white flex flex-col items-center justify-center text-center px-5 pt-10 pb-5 rounded-lg gap-5 x-[346px] y-[198px]">
        <h1 className="text-18 text-bold">{convertNewlineToJSX(title)}</h1>
        <div className="border border-swifty-color-700 w-full mt-5" />
        <Button
          block
          className="text-16 font-bold"
          onClick={() => toast.dismiss(t)}
        >
          확인
        </Button>
      </div>
    ),
    {
      position: 'bottom-center',
    },
  );
}
