'use client';

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
    if (!e.target.value) setIsFocused(false);
    onBlur?.(e);
  }, []);

  return (
    <div
      className="rounded-xl bg-neutral-800 transition-all duration-200 ease-in-out"
      style={{
        border: isFocused ? '1px solid #1967FF' : '1px solid transparent',
        padding: '10px 20px',
        boxShadow: isFocused
          ? '0px 2.77px 2.21px 0px rgba(25, 103, 255, 0.0197), 0px 6.65px 5.32px 0px rgba(25, 103, 255, 0.0283), 0px 12.52px 10.02px 0px rgba(25, 103, 255, 0.035), 0px 22.34px 17.87px 0px rgba(25, 103, 255, 0.0417), 0px 41.78px 33.42px 0px rgba(25, 103, 255, 0.0503), 0px 100px 80px 0px rgba(25, 103, 255, 0.07)'
          : '',
      }}
    >
      {placeholder && (
        <label
          htmlFor={name}
          className="text-14 inline-block transition-all duration-300 ease-in-out'"
          style={{
            fontSize: isFocused || !!value ? '0.875rem' : '1rem',
            color: isFocused ? '#1967FF' : 'rgb(162 162 168)',
          }}
        >
          {placeholder}
        </label>
      )}
      <input
        type={type}
        ref={(element) => {
          if (ref) {
            if (typeof ref === 'function') {
              ref(element);
            } else {
              ref.current = element;
            }
          }
        }}
        id={name}
        className="w-full bg-transparent text-white text-16 font-medium transition-all duration-300 ease-in-out autofill:bg-transparent"
        disabled={disabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
