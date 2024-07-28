'use client';

import ChevronDown from '@icons/bottom-arrow.svg';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { cn } from '@swifty/shared-lib';
import { type ElementRef, forwardRef, useState } from 'react';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from '../drawer';
import { Choose, Otherwise, When } from '../lib';

export type SelectOptionType = {
  label: string;
  value: string;
};

type SelectProps<T extends SelectOptionType[]> = {
  options: T;
  onValueChange: (value: T[number]['value']) => void;
  defaultValue?: T[number]['value'];
  label: string;
  placeholder?: string;
  render?: (options: T) => JSX.Element;
};

export default function Select<T extends SelectOptionType[]>({
  options,
  label,
  onValueChange,
  defaultValue,
  placeholder,
  render,
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
            'ui-w-full ui-h-full ui-flex ui-items-center ui-justify-between ui-border ui-font-medium ui-rounded-xl ui-relative ui-px-5 ui-py-3 ui-overflow-hidden dark:ui-bg-swifty-color-800 ui-bg-white ui-transition-colors ui-duration-200 ui-ease-in-out focus:ui-outline-none focus:ui-ring-2 focus:ui-ring-offset-2 focus:ui-ring-primary',
            isOpen
              ? 'ui-border-primary ui-shadow-input-active'
              : 'ui-border-transparent',
          )}
          type="button"
        >
          <div className="ui-flex ui-flex-col ui-items-start">
            <label
              className={cn(
                'ui-text-[14px] ui-leading-5 ui-mb-2',
                isOpen ? 'ui-text-primary' : 'ui-text-swifty-color-400',
              )}
            >
              {label}
            </label>
            <span
              className={cn(
                'ui-text-16 ui-font-medium ui-leading-6',
                selectedOption !== null && 'ui-text-swifty-color-400',
              )}
            >
              {getLabel(selectedOption)}
            </span>
          </div>
          <ChevronDown />
        </button>
      </DrawerTrigger>
      <DrawerContent className="ui-px-[30px] ui-pb-[40px]">
        <div
          className="ui-grid ui-gird-cols-1 ui-divide-y ui-divide-swifty-color-700"
          onClick={handleSelect}
        >
          <Choose value={render}>
            <When value={undefined}>
              {options.map((option) => (
                <SelectOption key={option.value} value={option.value}>
                  {option.label}
                </SelectOption>
              ))}
            </When>
            <Otherwise>{render?.(options)}</Otherwise>
          </Choose>
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
          className="ui-text-center ui-text-16 ui-font-medium ui-py-[22px] hover:dark:ui-bg-gray-900 hover:ui-bg-swifty-color-200 focus:ui-outline-none focus:ui-ring-2 focus:ui-ring-offset-2 focus:dark:ui-ring-swifty-color-900 hover:ui-ring-swifty-color-200"
          {...props}
        >
          {children}
        </button>
      </DrawerClose>
    );
  },
);
SelectOption.displayName = 'SelectOption';
