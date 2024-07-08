'use client';

import ChevronDown from '@icons/bottom-arrow.svg';
import { cn } from '@swifty/shared-lib';
import React, { type ElementRef, type FocusEvent, useState } from 'react';

import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '../drawer';

type SelectProps<T extends readonly string[]> = {
  options: T;
  onChange: (value: T[number]) => void;
  defaultValue: string;
  label: string;
  onBlur?: (e: FocusEvent<HTMLButtonElement>) => void;
  onFocus?: (e: FocusEvent<HTMLButtonElement>) => void;
  placeholder?: string;
};

export default function Select<T extends readonly string[]>({
  options,
  defaultValue,
  label,
  onChange,
  placeholder,
}: SelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const isActive = isOpen || value;

  const onSelectValue = (value: T[number]) => {
    setValue(value);
    onChange(value);
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <button
          className={cn(
            'w-full h-full flex items-center justify-between border font-medium rounded-xl relative px-5 py-3 overflow-hidden bg-neutral-800 transition-all *:transition-all *:duration-200 *:ease-in-out',
            isActive
              ? 'border-primary shadow-input-active'
              : 'border-transparent',
          )}
          type="button"
        >
          <div className="flex flex-col items-start">
            <label
              className={cn(
                'text-[14px] leading-5',
                isActive ? 'text-primary' : 'text-swifty-color-400',
              )}
            >
              {label}
            </label>
            <span
              className={cn(
                'text-white text-16 font-medium leading-6',
                !value && 'text-swifty-color-400',
              )}
            >
              {value ?? placeholder}
            </span>
          </div>
          <ChevronDown className="" />
        </button>
      </DrawerTrigger>
      <DrawerContent className="[&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:border-swifty-color-700 px-[30px]">
        {options.map((item) => (
          <DrawerClose key={item}>
            <Item value={item} onClick={onSelectValue} />
          </DrawerClose>
        ))}
      </DrawerContent>
    </Drawer>
  );
}

type ItemProps = {
  value: string;
  onClick: (value: string) => void;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'>;

const Item = React.forwardRef<ElementRef<'div'>, ItemProps>(
  ({ value, onClick, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className="bg-black text-white text-center text-16 font-medium py-[22px] hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-swifty-gray-900"
        onClick={() => onClick(value)}
        {...props}
      >
        {value}
      </div>
    );
  },
);
