'use client';

import { BottomSheet } from '@components/common';
import useBottomSheet from '@hooks/use-bottom-sheet';
import BottomArrow from '@icons/bottom-arrow.svg';
import { Input } from '@swifty/ui';
import cn from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';
import { useRef, useState } from 'react';

type Props = {
  data: string[];
  label: string;
  defaultValue: string;
};

export default function BottomSelect({ data, label, defaultValue }: Props) {
  const [isOpen, open, close] = useBottomSheet();
  const [value, setValue] = useState(defaultValue);
  const ref = useRef<HTMLInputElement>(null);

  const onOpen = () => {
    open();
    ref.current?.focus();
  };

  const onSelectValue = (value: string) => {
    setValue(value);
    close();
  };

  return (
    <div>
      <div onClick={onOpen} className="relative">
        <Input
          label={label}
          defaultValue={value}
          ref={ref}
          type="button"
          className={
            defaultValue === value ? 'text-swifty-color-500' : 'text-white'
          }
        />
        <BottomArrow className="absolute top-[31px] right-10" />
      </div>

      <BottomSheet isOpen={isOpen} onDismiss={close}>
        {data.map((item, index) => (
          <Item
            key={item}
            value={item}
            underline={index !== data.length - 1}
            onClick={() => onSelectValue(item)}
          />
        ))}
      </BottomSheet>
    </div>
  );
}

type Item = {
  value: string;
  underline?: boolean;
} & ComponentPropsWithoutRef<'div'>;

function Item({ value, underline, ...props }: Item) {
  return (
    <div
      className={cn(
        'bg-black text-white text-center text-16 font-medium py-[22px] hover:bg-gray-800 focus:bg-swifty-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-swifty-gray-500',
        underline && 'border-swifty-color-700 border-b-2 border-solid',
      )}
      {...props}
    >
      {value}
    </div>
  );
}
