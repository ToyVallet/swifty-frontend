'use client';

import type {
  TermAccordion,
  TermAction,
} from '@components/signup/terms-of-service';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/ui/accordion';
import CheckIcon from '@icons/chceck.svg';
import { type MouseEvent, useRef } from 'react';

interface Props {
  termAccordion: TermAccordion;
  value: string;
  index: number;
  dispatch: (action: TermAction) => void;
}

export default function TermOfServiceAccordionItem({
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
        className="bg-swifty-color-800 px-5 rounded-lg text-white"
        datatype="open"
      >
        {termAccordion.title}
        <CheckIcon
          fill={
            termAccordion.approve
              ? 'rgba(25, 103, 255, 1)'
              : 'rgba(162, 162, 168, 1)'
          }
          onClick={handleTermCheck}
        />
      </AccordionTrigger>
      <AccordionContent className="bg-swifty-color-800 p-5 rounded-lg text-white max-h-[210px] overflow-y-auto">
        {termAccordion.content}
      </AccordionContent>
    </AccordionItem>
  );
}
