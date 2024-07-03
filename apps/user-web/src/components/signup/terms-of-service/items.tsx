'use client';

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/ui/accordion';
import CheckIcon from '@icons/check.svg';
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
  const handleTermCheck = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch({ type: 'singleApprove', index });
  };

  return (
    <AccordionItem value={value} className="flex flex-col gap-2.5 border-none">
      <AccordionTrigger
        className="bg-swifty-color-800 p-5 rounded-xl text-16 text-white font-medium"
        datatype="open"
      >
        {termAccordion.title}
        <CheckIcon
          fill={
            termAccordion.approved
              ? 'rgba(25, 103, 255, 1)'
              : 'rgba(162, 162, 168, 1)'
          }
          onClick={handleTermCheck}
        />
      </AccordionTrigger>
      <AccordionContent className="bg-swifty-color-800 px-5 py-[22px] rounded-xl text-13 text-white max-h-[210px] overflow-y-auto ">
        {termAccordion.content}
      </AccordionContent>
    </AccordionItem>
  );
}
