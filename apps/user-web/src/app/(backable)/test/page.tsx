'use client';

import { BottomSheet } from '@components/common';
import { Select, SelectTrigger } from '@components/ui/select';
import useBottomSheet from '@hooks/use-bottom-sheet';
import { Input } from '@swifty/ui';
import cn from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';
import { useState } from 'react';

export default function Page() {
  const [isOpen, open, close] = useBottomSheet();
  const [value, setValue] = useState('asdasd');
  const sex = ['남성', '여성'] as const;

  const onOpen = () => {
    open();
  };

  const onSelectValue = (value: string) => {
    setValue(value);
    close();
  };
  return (
    <div>
      <Input
        name="성별"
        placeholder="성별"
        defaultValue={value}
        type="button"
        onClick={onOpen}
      />
      <BottomSheet isOpen={isOpen} onDismiss={close}>
        {sex.map((item, index) => (
          <Item
            key={item}
            value={item}
            underline={index !== sex.length - 1}
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
