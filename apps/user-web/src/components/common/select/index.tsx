'use client';

import { BottomSheet } from '@components/common';
import useBottomSheet from '@hooks/use-bottom-sheet';
import ChevronDown from '@icons/bottom-arrow.svg';
import cn from 'clsx';
import { type FocusEvent, useState } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */

type Props = {
  name: string;
  data: readonly string[];
  onChange: (value: string[][number]) => void;
  defaultValue: string;
  label: string;
  onBlur?: (e: FocusEvent<HTMLButtonElement>) => void;
  onFocus?: (e: FocusEvent<HTMLButtonElement>) => void;
};

export default function Select({
  data,
  defaultValue,
  label,
  name,
  onChange,
  onBlur,
  onFocus,
}: Props) {
  const [isOpen, open, close] = useBottomSheet();
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState(defaultValue);

  const onSelectValue = (value: string) => {
    setValue(value);
    onChange(value);
    close();
  };

  const handleBlur = (e: FocusEvent<HTMLButtonElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const handleFocus = (e: FocusEvent<HTMLButtonElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  return (
    <>
      <button
        className="w-full h-full max-h-[69px] font-medium rounded-xl relative px-5 py-3 overflow-hidden bg-neutral-800 transition-all duration-200 ease-in-out text-start"
        name={name}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onClick={open}
        type="button"
        style={{
          border: isFocused ? '1px solid #1967FF' : '1px solid transparent',
          boxShadow: isFocused
            ? '0px 2.77px 2.21px 0px rgba(25, 103, 255, 0.0197), 0px 6.65px 5.32px 0px rgba(25, 103, 255, 0.0283), 0px 12.52px 10.02px 0px rgba(25, 103, 255, 0.035), 0px 22.34px 17.87px 0px rgba(25, 103, 255, 0.0417), 0px 41.78px 33.42px 0px rgba(25, 103, 255, 0.0503), 0px 100px 80px 0px rgba(25, 103, 255, 0.07)'
            : '',
        }}
      >
        <h3
          className="text-swifty-color-400 text-14 transition-all duration-300 ease-in-out"
          style={{
            fontSize: isFocused ? '0.875rem' : '1rem',
            color: isFocused ? '#1967FF' : '',
          }}
        >
          {label}
        </h3>
        <span
          className={cn(
            'text-white text-16 font transition-all duration-300 ease-in-out',
            defaultValue === value && 'text-swifty-color-400',
          )}
        >
          {value}
        </span>
        <ChevronDown className="absolute top-[30px] right-[31px]" />
      </button>
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
    </>
  );
}

type ItemProps = {
  value: string;
  underline?: boolean;
} & React.ComponentPropsWithoutRef<'div'>;

function Item({ value, underline = true, ...props }: ItemProps) {
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
