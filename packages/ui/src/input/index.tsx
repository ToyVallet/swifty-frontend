'use client';

import EyeCross from '@icons/eye-cross.svg';
import Eye from '@icons/eye.svg';
import { cn } from '@swifty/shared-lib';
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  useCallback,
  useState,
} from 'react';

interface InputProps
  extends Omit<ComponentPropsWithoutRef<'input'>, 'name' | 'placeholder'> {
  name: string;
  placeholder: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function (
  {
    name,
    disabled,
    type = 'text',
    placeholder,
    onFocus,
    onBlur,
    value,
    ...props
  },
  ref,
) {
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  }, []);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  }, []);

  return (
    <div
      className={cn(
        'w-full relative rounded-xl overflow-hidden bg-neutral-800 transition-all duration-200 ease-in-out',
      )}
      style={{
        border: isFocused ? '1px solid #1967FF' : '1px solid transparent',
        boxShadow: isFocused
          ? '0px 2.77px 2.21px 0px rgba(25, 103, 255, 0.0197), 0px 6.65px 5.32px 0px rgba(25, 103, 255, 0.0283), 0px 12.52px 10.02px 0px rgba(25, 103, 255, 0.035), 0px 22.34px 17.87px 0px rgba(25, 103, 255, 0.0417), 0px 41.78px 33.42px 0px rgba(25, 103, 255, 0.0503), 0px 100px 80px 0px rgba(25, 103, 255, 0.07)'
          : '',
      }}
    >
      {placeholder && (
        <label
          htmlFor={name}
          className="left-5 text-neutral-400 absolute transition-all duration-300 ease-in-out"
          style={{
            fontSize: isFocused || !!value ? '0.875rem' : '1rem',
            top: '13px',
            color: isFocused ? '#1967FF' : '',
          }}
        >
          {placeholder}
        </label>
      )}
      <input
        type={type}
        ref={ref}
        className="w-full bg-transparent text-white text-16 transition-all duration-300 ease-in-out autofill:bg-transparent"
        disabled={disabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{
          marginTop: isFocused || !!value ? '30px' : '',
          padding: '0.75rem 1.25rem',
        }}
        {...props}
      />
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
