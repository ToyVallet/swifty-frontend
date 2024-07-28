'use client';

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/ui/accordion';
import { Icon } from '@swifty/assets';
import { type MouseEvent } from 'react';

import type { TermAccordion, TermAction } from './types';

interface Props {
  termAccordion: TermAccordion;
  value: string;
  index: number;
  dispatch: (action: TermAction) => void;
}

export default function Items({
  value,
  index,
  dispatch,
  termAccordion,
}: Props) {
  const handleTermCheck = (e: MouseEvent<SVGElement>) => {
    e.stopPropagation();
    dispatch({ type: 'singleApprove', index });
  };

  return (
    <AccordionItem value={value} className="flex flex-col gap-2.5 border-none">
      <AccordionTrigger
        className="dark:bg-swifty-color-800 bg-swifty-color-200 p-5 rounded-xl text-16 font-medium [&[data-state=open]>svg]:rotate-90"
        datatype="open"
      >
        <div className="flex justify-center items-center gap-5">
          <Icon
            name="check-circle"
            width={30}
            height={30}
            fill={
              termAccordion.approved
                ? 'rgba(25, 103, 255, 1)'
                : 'rgba(162, 162, 168, 1)'
            }
            onClick={handleTermCheck}
          />
          {termAccordion.title}
        </div>
        <Icon
          name="chevron-right"
          width={30}
          height={30}
          className="dark:fill-white fill-black"
        />
      </AccordionTrigger>
      <AccordionContent className="dark:bg-swifty-color-800 bg-swifty-color-200 px-5 py-[22px] rounded-xl text-13 max-h-[210px] overflow-y-auto ">
        {termAccordion.content}
      </AccordionContent>
    </AccordionItem>
  );
}
