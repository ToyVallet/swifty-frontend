'use client';

import ChevronDown from '@icons/bottom-arrow.svg';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { cn } from '@swifty/shared-lib';
import React, { type ElementRef, useState } from 'react';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from '../drawer';

type SelectOption = {
  label: string;
  value: string;
};

type SelectProps<T extends SelectOption[]> = {
  options: T;
  onValueChange: (value: T[number]['value']) => void;
  defaultValue?: T[number]['value'];
  label: string;
  placeholder?: string;
};

export default function Select<T extends SelectOption[]>({
  options,
  label,
  onValueChange,
  defaultValue,
  placeholder,
}: SelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<T[number] | null>(
    options.find((option) => option.value === defaultValue) ?? null,
  );

  const onSelectOption = (option: T[number]) => {
    setSelectedOption(option);
    onValueChange(option.value);
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <button
          className={cn(
            'w-full h-full flex items-center justify-between border font-medium rounded-xl relative px-5 py-3 overflow-hidden bg-neutral-800 transition-all *:transition-all *:duration-200 *:ease-in-out',
            isOpen
              ? 'border-primary shadow-input-active'
              : 'border-transparent',
          )}
          type="button"
        >
          <div className="flex flex-col items-start">
            <label
              className={cn(
                'text-[14px] leading-5',
                isOpen ? 'text-primary' : 'text-swifty-color-400',
              )}
            >
              {label}
            </label>
            <span
              className={cn(
                'text-white text-16 font-medium leading-6',
                !selectedOption && 'text-swifty-color-400',
              )}
            >
              {selectedOption?.label ?? placeholder}
            </span>
          </div>
          <ChevronDown />
        </button>
      </DrawerTrigger>
      <DrawerContent className="[&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:border-swifty-color-700 px-[30px]">
        {options.map(({ label, value }) => (
          <DrawerClose key={value}>
            <SelectOption
              value={value}
              label={label}
              onClick={onSelectOption}
            />
          </DrawerClose>
        ))}
        {/* 웹 접근성을 위한 영역 */}
        <VisuallyHidden.Root>
          <DrawerTitle>통신사 선택 드로워</DrawerTitle>
          <DrawerDescription>통신사를 선택해주세요.</DrawerDescription>
        </VisuallyHidden.Root>
      </DrawerContent>
    </Drawer>
  );
}

type SelectOptionProps = {
  onClick: (option: SelectOption) => void;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> &
  SelectOption;

const SelectOption = React.forwardRef<ElementRef<'div'>, SelectOptionProps>(
  ({ value, label, onClick, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className="bg-black text-white text-center text-16 font-medium py-[22px] hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-swifty-gray-900"
        onClick={() => onClick({ value, label })}
        {...props}
      >
        {label}
      </div>
    );
  },
);
SelectOption.displayName = 'SelectOption';
