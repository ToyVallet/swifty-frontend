'use client';

import { cn } from '@swifty/shared-lib';
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  useCallback,
  useState,
} from 'react';

const Input = forwardRef<HTMLInputElement, ComponentPropsWithoutRef<'input'>>(
  function (
    {
      name = 'text',
      disabled,
      type = 'text',
      placeholder,
      value: _value,
      ...props
    },
    ref,
  ) {
    const [value, setValue] = useState(_value);
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      props?.onFocus?.(e);
    }, []);

    const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
    }, []);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
      },
      [],
    );

    return (
      <div
        className={cn(
          'w-full relative rounded-xl overflow-hidden bg-neutral-800 transition-all duration-300 ease-in-out',
        )}
        style={{
          border: isFocused ? '1px solid #1967FF' : '1px solid transparent',
        }}
      >
        {placeholder && (
          <label
            htmlFor={name}
            className="left-5 text-neutral-400 absolute transition-all duration-300 ease-in-out"
            style={{
              fontSize: isFocused || value ? '0.875rem' : '1rem',
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
          className="w-full bg-transparent text-white text-base px-5 py-3 autofill:bg-in transition-all duration-300 ease-in-out"
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          style={{
            marginTop: isFocused || value ? '30px' : '',
          }}
          {...props}
        />
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
