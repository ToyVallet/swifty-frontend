'use client';

import ChevronDown from '@icons/bottom-arrow.svg';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { cn } from '@swifty/shared-lib';
import {
  type ElementRef,
  type PropsWithChildren,
  forwardRef,
  useState,
} from 'react';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from '../drawer';

export type SelectOptionType = {
  label: string;
  value: string;
};

type SelectProps<T extends SelectOptionType[]> = PropsWithChildren<{
  options: T;
  onValueChange: (value: T[number]['value']) => void;
  defaultValue?: T[number]['value'];
  label: string;
  placeholder?: string;
}>;

export default function Select<T extends SelectOptionType[]>({
  options,
  label,
  onValueChange,
  defaultValue,
  placeholder,
  children,
}: SelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<T[number]['value'] | ''>(
    defaultValue ?? '',
  );

  const getLabel = (value: T[number]['value']) =>
    options.find((option) => option.value === value)?.label ?? placeholder;

  const handleSelect = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    const value = target.getAttribute('data-value');

    console.log(target, value);

    if (value) {
      onValueChange?.(value);
      setIsOpen(false);
      setSelectedOption(value);
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <button
          className={cn(
            'w-full h-full flex items-center justify-between border font-medium rounded-xl relative px-5 py-3 overflow-hidden bg-swifty-color-800 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary',
            isOpen
              ? 'border-primary shadow-input-active'
              : 'border-transparent',
          )}
          type="button"
        >
          <div className="flex flex-col items-start">
            <label
              className={cn(
                'text-[14px] leading-5 mb-2',
                isOpen ? 'text-primary' : 'text-swifty-color-400',
              )}
            >
              {label}
            </label>
            <span
              className={cn(
                'text-white text-16 font-medium leading-6',
                selectedOption !== null && 'text-swifty-color-400',
              )}
            >
              {getLabel(selectedOption)}
            </span>
          </div>
          <ChevronDown />
        </button>
      </DrawerTrigger>
      <DrawerContent className="px-[30px] pb-[40px]">
        <div
          className="grid gird-cols-1 divide-y divide-swifty-color-700"
          onClick={handleSelect}
        >
          {children}
        </div>
        {/* 웹 접근성을 위한 영역 */}
        <VisuallyHidden.Root>
          <DrawerTitle>선택 드로워</DrawerTitle>
          <DrawerDescription>선택해주세요.</DrawerDescription>
        </VisuallyHidden.Root>
      </DrawerContent>
    </Drawer>
  );
}

type SelectOptionProps = React.HTMLAttributes<HTMLButtonElement> &
  Pick<SelectOptionType, 'value'>;

export const SelectOption = forwardRef<ElementRef<'button'>, SelectOptionProps>(
  ({ value, children, ...props }, ref) => {
    return (
      <DrawerClose asChild>
        <button
          ref={ref}
          data-value={value}
          className="bg-black text-white text-center text-16 font-medium py-[22px] hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-swifty-gray-900"
          {...props}
        >
          {children}
        </button>
      </DrawerClose>
    );
  },
);
SelectOption.displayName = 'SelectOption';
