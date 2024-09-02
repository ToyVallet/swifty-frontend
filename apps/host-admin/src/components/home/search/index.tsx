'use client';

import { Icon } from '@swifty/assets';
import type { ComponentPropsWithoutRef, KeyboardEvent } from 'react';
import { forwardRef } from 'react';

type Props = {
  setValue: (value: string) => void;
} & ComponentPropsWithoutRef<'input'>;

const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { setValue, ...rest },
  ref,
) {
  const onSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      setValue(e.currentTarget.value);
    }
  };

  const onClick = () => {
    if (ref && typeof ref === 'object' && 'current' in ref) {
      const value = ref.current?.value;
      setValue(value ? value : '');
    }
  };

  return (
    <div className="relative">
      <input
        ref={ref}
        {...rest}
        onKeyDown={onSearch}
        placeholder="검색"
        className="w-[350px] h-[50px] relative py-3 px-5 bg-white text-16 font-medium rounded-xl"
      />
      <button onClick={onClick}>
        <Icon
          name="host-admin/search"
          width={40}
          height={40}
          className="absolute top-1 right-2"
        />
      </button>
    </div>
  );
});

export default Input;
